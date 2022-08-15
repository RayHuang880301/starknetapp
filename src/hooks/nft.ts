import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import Erc721Abi from '~/abi/erc721.json'

export function useNftContract() {
  return useContract({
    abi: Erc721Abi as Abi,
    address: '0x014f90fe1c113d1054c5f420ebb3ab0e039c45d896453ed5059f39dca7e46ae0',
  })
}
