import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
} from "@starknet-react/core";
import React from "react";
import { useNftContract } from "~/hooks/nft";

// export function NftContract() {
//   const { contract: nft } = useNftContract();
//   const { data: name, refresh: refreshName } = useStarknetCall({
//     contract: nft,
//     method: "name",
//     args: [],
//   });

//   const { data: totalSupply, refresh: refreshTotalSupply } = useStarknetCall({
//     contract: nft,
//     method: "totalSupply",
//     args: [],
//   });

//   const { data: mintPrice, refresh: refreshMintPrice } = useStarknetCall({
//     contract: nft,
//     method: "mintPrice",
//     args: [],
//   });

//   refreshName();
//   refreshTotalSupply();
//   refreshMintPrice();
//   return name;
// }
