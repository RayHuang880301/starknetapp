import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import EthAbi from '~/abi/eth.json'

export function useEthContract(ethAddress: string) {
  return useContract({
    abi: EthAbi as Abi,
    address: ethAddress,
  })
}