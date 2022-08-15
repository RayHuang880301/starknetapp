import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
const EthAbi = require('../abi/erc20.json')
export function useEthContract(ethAddress: string) {
  return useContract({
    abi: EthAbi as Abi,
    address: ethAddress,
  })
}