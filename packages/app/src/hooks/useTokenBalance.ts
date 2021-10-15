import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import {getBalance, getNativeBalance} from '../utils/erc20'
import usePepemon from './usePepemon';
import {correctChainIsLoaded} from '../utils/network';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, provider, chainId }: { account: string; provider: any, chainId: any } = usePepemon()
  const pepemon = usePepemon();

  const fetchBalance = useCallback(async () => {
    const balance = chainId === 56 ? await getNativeBalance(provider, account) : await getBalance(provider, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, provider, tokenAddress, chainId])

  useEffect(() => {
    if (account) {
      correctChainIsLoaded(pepemon).then((correct) => {
        if (correct) {
          fetchBalance()
        }
      });
    }
  }, [account, fetchBalance, pepemon])

  return balance
}

export default useTokenBalance
