import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import Erc721Abi from '~/abi/erc721.json'

export function useNftContract(erc721Address: string) {
  return useContract({
    abi: Erc721Abi as Abi,
    address: erc721Address,
  })
}
