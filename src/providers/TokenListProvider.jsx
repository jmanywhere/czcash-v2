import { getAddress } from 'ethers/lib/utils.js';
import { createContext, useEffect, useState } from 'react';
import { LOCAL_TOKENS } from '../constants/localTokens';
import fetchCoingeckoList from '../utils/tokenlist/fetchCoingeckoList';

export const TokenListContext = createContext(null);

export const TokenListProvider = ({ children }) => {
  const [tokenList, setTokenList] = useState(
    localStorage.getItem('tokenList') === 'true'
      ? localStorage.getItem('tokenList')
      : []
  );
  useEffect(() => {
    updateTokenList();
  }, []);
  const updateTokenList = async () => {
    const localTokens = LOCAL_TOKENS.map((item) => ({
      name: item.name,
      symbol: item.symbol,
      address: getAddress(item.address),
      decimals: item.decimals,
      logoURI: item.logoURI,
      source: 'czcash',
    }));
    if (tokenList.length < 1) {
      //User gets the czusd tokens even if coingecko down
      setTokenList(localTokens);
    }
    const geckoTokens = await fetchCoingeckoList();
    const newTokenList = [...localTokens];
    geckoTokens.forEach((token) => {
      if (
        !localTokens.find(
          (newToken) =>
            newToken.address.toLowerCase() == token.address.toLowerCase()
        )
      ) {
        newTokenList.push({ source: 'coingecko', ...token });
      }
    });
    setTokenList(newTokenList);
  };

  return (
    <TokenListContext.Provider value={{ tokenList, updateTokenList }}>
      {children}
    </TokenListContext.Provider>
  );
};
