import { watchMulticall } from '@wagmi/core';
import { parseEther } from 'ethers/lib/utils.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import RoutingAssistantABI from '../abi/RoutingAssistant.json';
import {
  ADDRESS_CZUSD,
  ADDRESS_ROUTING_ASSISTANT,
} from '../constants/addresses';
import { TokenListContext } from './TokenListProvider';

export const TokenBalancesContext = createContext(null);

const CALL_SIZE = 200;
const CALL_SIZE_PRICES = 100;

const useTokenListBalances = (tokenAddresses) => {
  const [balances, setBalances] = useState({});
  const [prices, setPrices] = useState({});
  const [routingTokens, setRoutingTokens] = useState({});
  const [prevAddress, setPrevAddress] = useState(null);

  const { address } = useAccount();

  const resetBalances = () => {
    setBalances({});
  };

  useEffect(() => {
    if (tokenAddresses.length == 0 || !address) {
      resetBalances();
      return;
    }
    if (address != prevAddress) {
      //reset balances
      setPrevAddress(address);
      resetBalances();
    }

    let unwatches = [];
    let isMounted = true;

    const ierc20BalanceOf = {
      abi: IERC20Abi,
      functionName: 'balanceOf',
      args: [address],
    };
    for (let i = 0; i <= Math.floor(tokenAddresses.length / CALL_SIZE); i++) {
      let tokenAddressesSet = tokenAddresses.slice(
        i * CALL_SIZE,
        (i + 1) * CALL_SIZE
      );
      let handleData = (data) => {
        if (!isMounted) return;
        const newBalances = {};
        tokenAddressesSet.forEach((tokenAddress, index) => {
          newBalances[tokenAddress] = data[index];
        });
        setBalances((oldBalances) => ({ ...oldBalances, ...newBalances }));
      };
      //NOTE: This aggressively updates on every block on all tokens.
      //It may need to be made less aggressive and use smarter updates.
      unwatches.push(
        watchMulticall(
          {
            contracts: tokenAddressesSet.map((tokenAddress) => ({
              ...ierc20BalanceOf,
              address: tokenAddress,
            })),
            listenToBlock: true,
            allowFailure: true, //Some tokens have errors
          },
          handleData
        )
      );
    }
    return () => {
      isMounted = false;
      unwatches.forEach((unwatch) => unwatch());
    };
  }, [address, tokenAddresses.length]);

  useEffect(() => {
    if (tokenAddresses.length == 0 || !address) {
      resetBalances();
      return;
    }

    let unwatches = [];
    let isMounted = true;

    const routingAssistantGetIntermediatePairedTokenRate = {
      abi: RoutingAssistantABI,
      functionName: 'getIntermediatePairedTokenRate',
      address: ADDRESS_ROUTING_ASSISTANT,
    };
    for (
      let i = 0;
      i <= Math.floor(tokenAddresses.length / CALL_SIZE_PRICES);
      i++
    ) {
      let tokenAddressesSet = tokenAddresses.slice(
        i * CALL_SIZE_PRICES,
        (i + 1) * CALL_SIZE_PRICES
      );
      let handleData = (data) => {
        if (!isMounted) return;
        const newPrices = {};
        const newRoutes = {};
        tokenAddressesSet.forEach((tokenAddress, index) => {
          if (tokenAddress == ADDRESS_CZUSD) {
            newPrices[tokenAddress] = parseEther('1');
            newRoutes[tokenAddress] = ADDRESS_CZUSD;
          } else if (
            tokenAddress != ADDRESS_CZUSD &&
            data[index] != null &&
            !!data[index]?.rateWad_
          ) {
            newPrices[tokenAddress] = data[index].rateWad_;
            newRoutes[tokenAddress] = data[index].intermediateToken_;
          }
        });
        setPrices((oldPrices) => ({ ...oldPrices, ...newPrices }));
        setRoutingTokens((oldRoutes) => ({ ...oldRoutes, ...newRoutes }));
      };

      //TODO: Refactor into main watch for token balances
      unwatches.push(
        watchMulticall(
          {
            contracts: tokenAddressesSet.map((tokenAddress) => ({
              ...routingAssistantGetIntermediatePairedTokenRate,
              args: [tokenAddress],
            })),
            allowFailure: true, //Some tokens have errors
            listenToBlock: true,
          },
          handleData
        )
      );
    }

    return () => {
      isMounted = false;
      unwatches.forEach((unwatch) => unwatch());
    };
  }, [tokenAddresses.length]);

  return { balances, resetBalances, prices, routingTokens };
};

export const TokenBalancesProvider = ({ children }) => {
  const { tokenList } = useContext(TokenListContext);

  const { balances, resetBalances, prices, routingTokens } =
    useTokenListBalances(tokenList.map((token) => token.address));

  return (
    <TokenBalancesContext.Provider
      value={{
        balances: balances,
        resetBalances: resetBalances,
        prices: prices,
        routingTokens: routingTokens,
      }}
    >
      {children}
    </TokenBalancesContext.Provider>
  );
};
