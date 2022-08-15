import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import PayMasterAbi from '~/abi/eth.json'

export function usePayMasterContract() {
  return useContract({
    abi: PayMasterAbi as Abi,
    address: '0x071ddc64f54b771fe9a9fb38e9922328988da6b96674eac0e40ab39571375614',
  })
}