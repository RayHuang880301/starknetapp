import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import EthAbi from '~/abi/eth.json'

export function useEthContract() {
  return useContract({
    abi: EthAbi as Abi,
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  })
}