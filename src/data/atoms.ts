import { atom } from 'jotai';
import { BigNumber } from 'ethers';


// Token Prices
export const czusdPrice = atom(BigNumber.from(0))
export const czbPrice = atom(BigNumber.from(0))
export const czrPrice = atom(BigNumber.from(0))
