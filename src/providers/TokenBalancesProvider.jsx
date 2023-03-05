import { watchMulticall } from '@wagmi/core';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import { TokenListContext } from './TokenListProvider';

export const TokenBalancesContext = createContext(null);

const CALL_SIZE = 200;

const useTokenListBalances = (tokenAddresses) => {
  const [balances, setBalances] = useState({});
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

  return { balances, resetBalances };
};

export const TokenBalancesProvider = ({ children }) => {
  const { tokenList } = useContext(TokenListContext);

  const { balances, resetBalances } = useTokenListBalances(
    tokenList.map((token) => token.address)
  );

  return (
    <TokenBalancesContext.Provider
      value={{ balances: balances, resetBalances: resetBalances }}
    >
      {children}
    </TokenBalancesContext.Provider>
  );
};
