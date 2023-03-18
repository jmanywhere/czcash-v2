import { watchMulticall } from '@wagmi/core';
import { BigNumber } from 'ethers';
import { parseEther, parseUnits } from 'ethers/lib/utils.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { readContracts, useAccount } from 'wagmi';
import IERC20 from '../abi/IERC20.json';
import RoutingAssistantABI from '../abi/RoutingAssistant.json';
import {
  ADDRESS_CZUSD,
  ADDRESS_ROUTING_ASSISTANT,
} from '../constants/addresses';
import { TokenListContext } from './TokenListProvider';

export const TrackedTokensContext = createContext(null);

const useTokenListBalances = () => {
  const { tokenList } = useContext(TokenListContext);

  const [trackedTokens, setTrackedTokens] = useState(
    !!localStorage.getItem('trackedTokens')
      ? new Map(
          JSON.parse(localStorage.getItem('trackedTokens')).map(
            (tokenEntry) => [
              tokenEntry[0],
              {
                ...tokenEntry[1],
                balance:
                  !!tokenEntry[1].balance &&
                  BigNumber.from(tokenEntry[1].balance.hex),
                price:
                  !!tokenEntry[1].price &&
                  BigNumber.from(tokenEntry[1].price.hex),
              },
            ]
          )
        )
      : new Map()
  );
  const [prevAddress, setPrevAddress] = useState(null);

  const { address } = useAccount();

  const updateTrackedToken = (token) => {
    setTrackedTokens((oldTrackedTokens) => {
      const newTrackedTokens = new Map(oldTrackedTokens);

      newTrackedTokens.set(
        token.address,
        oldTrackedTokens instanceof Map && !!oldTrackedTokens.get(token.address)
          ? { ...oldTrackedTokens.get(token.address), ...token }
          : token
      );
      localStorage.setItem(
        'trackedTokens',
        JSON.stringify(Array.from(newTrackedTokens.entries()))
      );
      return newTrackedTokens;
    });
  };

  const scanForNonZeroBalances = async (address, tokenList, getIsMounted) => {
    const callSize = 50; //balance between speed and reducing request count
    const cutoff = 0.000001; //ignore token bal smaller than this

    const ierc20BalanceOf = {
      abi: IERC20,
      functionName: 'balanceOf',
      args: [address],
    };
    for (let i = 0; i <= Math.floor(tokenList.length / callSize); i++) {
      let tokensSet = tokenList.slice(i * callSize, (i + 1) * callSize);
      //Scans the blockchain for balances.
      const data = await readContracts({
        contracts: tokensSet.map((token) => ({
          ...ierc20BalanceOf,
          address: token.address,
        })),
        allowFailure: true, //Some tokens have errors
      });
      if (!getIsMounted()) return;
      tokensSet.forEach((token, index) => {
        let bal = data[index];
        if (
          !!bal &&
          bal?.gt(
            token.decimals >= 9 //Some tokens have very small decimal count
              ? parseUnits(cutoff.toString(), token.decimals)
              : 1
          )
        ) {
          updateTrackedToken({
            ...token,
            balance: bal,
          });
        }
      });
    }
  };

  const syncTokenWeb3Data = async (token) => {};

  const resetBalances = () => {
    setTrackedTokens((oldTrackedTokens) => {
      const newTrackedTokens = new Map();
      if (!!(oldTrackedTokens instanceof Map)) {
        oldTrackedTokens.forEach((token) => {
          delete token.balance;
          newTrackedTokens.set(token.address, token);
        });
      }
      localStorage.setItem(
        'trackedTokens',
        JSON.stringify(Array.from(newTrackedTokens.entries()))
      );
      return newTrackedTokens;
    });
  };

  useEffect(() => {
    if (trackedTokens.size == 0 || !address) {
      return;
    }

    const ierc20BalanceOf = {
      abi: IERC20,
      functionName: 'balanceOf',
      args: [address],
    };

    const callSize = 100; //balance between speed and reducing request count

    let unwatches = [];
    let isMounted = true;

    const routingAssistantGetIntermediatePairedTokenRate = {
      abi: RoutingAssistantABI,
      functionName: 'getIntermediatePairedTokenRate',
      address: ADDRESS_ROUTING_ASSISTANT,
    };
    for (let i = 0; i <= Math.floor(trackedTokens.size / callSize); i++) {
      let tokensSet = [...trackedTokens.values()].slice(
        i * callSize,
        (i + 1) * callSize
      );
      const handlePriceData = (data) => {
        if (!isMounted) return;
        tokensSet.forEach((token, index) => {
          let syncedToken = { ...token };
          if (token.address == ADDRESS_CZUSD) {
            syncedToken.price = parseEther('1');
            syncedToken.route = ADDRESS_CZUSD;
          } else if (
            token.address != ADDRESS_CZUSD &&
            data[index] != null &&
            !!data[index]?.rateWad_
          ) {
            syncedToken.price = data[index].rateWad_;
            syncedToken.route = data[index].intermediateToken_;
          }
          updateTrackedToken(syncedToken);
        });
      };

      const handleBalanceData = (data) => {
        if (!isMounted) return;
        tokensSet.forEach((token, index) => {
          let bal = data[index];
          if (!!bal) {
            updateTrackedToken({
              ...token,
              balance: bal,
            });
          }
        });
      };

      //First half is balances
      unwatches.push(
        watchMulticall(
          {
            contracts: tokensSet.map((token) => ({
              ...ierc20BalanceOf,
              address: token.address,
            })),
            allowFailure: true, //Some tokens have errors
            listenToBlock: true,
          },
          handleBalanceData
        )
      );
      //second half is prices/routes
      unwatches.push(
        watchMulticall(
          {
            contracts: tokensSet.map((token) => ({
              ...routingAssistantGetIntermediatePairedTokenRate,
              args: [token.address],
            })),
            allowFailure: true, //Some tokens have errors
            listenToBlock: true,
          },
          handlePriceData
        )
      );
    }

    return () => {
      isMounted = false;
      unwatches.forEach((unwatch) => unwatch());
    };
  }, [trackedTokens.size]);

  useEffect(() => {
    if (tokenList.length == 0 || !address) {
      resetBalances();
      return;
    }
    if (address != prevAddress) {
      //reset balances
      setPrevAddress(address);
      resetBalances();
    }
    let isMounted = true;

    const getIsMounted = () => isMounted;
    scanForNonZeroBalances(address, tokenList, getIsMounted);
    return () => {
      isMounted = false;
    };
  }, [address, tokenList.length]);

  return { trackedTokens, syncTokenWeb3Data };
};

export const TrackedTokensProvider = ({ children }) => {
  const { trackedTokens, updateTrackedToken, syncTokenWeb3Data } =
    useTokenListBalances();

  return (
    <TrackedTokensContext.Provider
      value={{
        trackedTokens: trackedTokens,
        syncTokenWeb3Data: syncTokenWeb3Data,
      }}
    >
      {children}
    </TrackedTokensContext.Provider>
  );
};
