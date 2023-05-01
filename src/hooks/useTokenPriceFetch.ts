import { czusdPrice, czbPrice, czrPrice } from "../data/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useContractReads } from "wagmi";
import AMMPair from '../abi/IAmmPair'
import PriceFeed from "../abi/PriceFeed";
import { ADDRESS_CZB_LP, ADDRESS_CZR_LP, ADDRESS_CZUSD_BNB_LP, ADDRESS_CZUSD_BUSD_LP, ADDRESS_CZUSD_USDT_LP, BNB_PRICE_FEED } from "../constants/addresses";
import { commify, formatEther, parseEther } from "ethers/lib/utils.js";
import { BigNumber } from "ethers";



const useTokenPriceFetch = () => {

    const setCZUSD = useSetAtom(czusdPrice)
    const setCZB = useSetAtom(czbPrice)
    const setCZR = useSetAtom(czrPrice)

    const { data: czLPData, refetch: lpRefetch } = useContractReads({
      contracts:[
        {
          address: ADDRESS_CZUSD_BNB_LP,
          abi: AMMPair,
          functionName: "getReserves",
        },
        {
          address: ADDRESS_CZUSD_USDT_LP,
          abi: AMMPair,
          functionName: "getReserves",
        },
        {
          address: ADDRESS_CZUSD_BUSD_LP,
          abi: AMMPair,
          functionName: "getReserves",
        },
        {
          address: ADDRESS_CZB_LP,
          abi: AMMPair,
          functionName: "getReserves",
        },
        {
          address: ADDRESS_CZR_LP,
          abi: AMMPair,
          functionName: "getReserves",
        },
        {
          address: BNB_PRICE_FEED,
          abi: PriceFeed,
          functionName: "latestRoundData",
        }
      ],
      onSuccess(data){

          if(!data || !data[0])
            return;
          const TVL = data[0].reserve0.mul(data[5].answer).div(1e8).add(data[1].reserve1).add(data[2].reserve0)
          


          setCZB(data?.[3] && data[3].reserve1.mul(parseEther("1")).div(data[3].reserve0) || BigNumber.from("0"))
          setCZR(data?.[4] && data[4].reserve1.mul(parseEther("1")).div(data[4].reserve0) || BigNumber.from("0"))
          setCZUSD( 
            data?.[0] && (
              data[0].reserve0.mul(data[5].answer).pow(2).mul(parseEther("1")).div(data[0].reserve1.mul(parseEther("0.01")))
              .add(
                data[1].reserve1.pow(2).mul(parseEther("1")).div(data[1].reserve0)
              )
              .add(
                data[2].reserve0.pow(2).mul(parseEther("1")).div(data[2].reserve1)
              ).div(TVL)
            )
            || BigNumber.from("0")
          )
    }
    })

    useEffect(() => {
      if(czLPData){
        const interval = setInterval( () => lpRefetch(), 60000)
        return () => clearInterval(interval)
      }

    },[czLPData, setCZB, setCZR, setCZUSD])

    
}

export default useTokenPriceFetch;