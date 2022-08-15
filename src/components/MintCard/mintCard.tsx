import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect } from "react";
import styles from "./mintCard.module.scss";
// import { NftContract } from "../NftContract/NftContract";
import { useNftContract } from "~/hooks/nft";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { decodeShortString } from "starknet/dist/utils/shortString";
import { BigNumberish } from "starknet/dist/utils/number";
import BN from "bn.js";
import { Abi, Call } from "starknet";
import { useStore } from "src/store/store";
import { starknetProvider, zeroGasExecute } from "src/lib/starknet-wallet";
import Erc721Abi from "~/abi/erc721.json";
import Swal from "sweetalert2";
import { Link, Spinner, useToast } from "@chakra-ui/react";

const ExampleErc721Address =
  "0x014f90fe1c113d1054c5f420ebb3ab0e039c45d896453ed5059f39dca7e46ae0";
const PaymasterAddress =
  "0x071ddc64f54b771fe9a9fb38e9922328988da6b96674eac0e40ab39571375614";
export default function MintCard() {
  const { contract: nft } = useNftContract(ExampleErc721Address);
  const { starknetStore } = useStore();
  const toast = useToast();

  const {
    data: name,
    loading: nameLoading,
    refresh: refreshName,
  } = useStarknetCall({
    contract: nft,
    method: "name",
    args: [],
  });

  const {
    data: symbol,
    loading: symbolLoading,
    refresh: refreshSymbol,
  } = useStarknetCall({
    contract: nft,
    method: "symbol",
    args: [],
  });

  const {
    data: totalSupply,
    loading: totalSupplyLoading,
    refresh: refreshTotalSupply,
  } = useStarknetCall({
    contract: nft,
    method: "totalSupply",
    args: [],
  });

  const decodeFeltToStr = (str: BN) => {
    return decodeShortString(str.toString("hex"));
  };

  const refreshAll = () => {
    refreshName();
    refreshSymbol();
    refreshTotalSupply();
    console.log("refresh NFT");
  };

  const freeMint = async () => {
    try {
      const erc721Call: Call = {
        contractAddress: ExampleErc721Address,
        entrypoint: "mint",
        calldata: [starknetStore.starknetAddress],
      };

      const erc721Result = await zeroGasExecute(
        starknetProvider,
        PaymasterAddress,
        starknetStore.starknetAddress,
        starknetStore.keyPair,
        [erc721Call],
        [Erc721Abi as Abi]
      );
      toast({
        title: "Success",
        description: "Minted successfully",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      console.log("erc721Result", erc721Result);
      await starknetProvider.waitForTransaction(erc721Result.transaction_hash);
      console.log("SUCCESS!");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <div className={styles.section}>
      <h1>ERC721 NFT</h1>
      <div className={styles.content}>
        {nameLoading || symbolLoading || totalSupplyLoading ? (
          <Spinner className={styles.icon} />
        ) : (
          <>
            <h4>
              Contract Address:&nbsp;
              <br />
              <Link
                href={`https://goerli.voyager.online/contract/${ExampleErc721Address}`}
              >
                <a target="_blank" rel="noreferrer">
                  <span className={styles.address}>{ExampleErc721Address}</span>
                </a>
              </Link>
            </h4>
            <h4>
              NFT Name:&nbsp;{name && <span>{decodeFeltToStr(name[0])}</span>}
            </h4>
            <h4>
              NFT Symbol:&nbsp;
              {symbol && <span>{decodeFeltToStr(symbol[0])}</span>}
            </h4>
            <h4>
              Total Supply:&nbsp;
              {totalSupply && (
                <span>{uint256ToBN(totalSupply[0]).toString()}</span>
              )}
            </h4>
            <h4>
              Mint Price:&nbsp;<span>0 ETH</span>
            </h4>
          </>
        )}
      </div>
      <button onClick={() => freeMint()} className={styles.btn}>
        Mint
      </button>
      {/* <button onClick={() => refreshAll()} className={styles.btn}>
        Refresh
      </button> */}
    </div>
  );
}
