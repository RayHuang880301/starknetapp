import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import styles from "./mintCard.module.scss";
// import { NftContract } from "../NftContract/NftContract";
import { useNftContract } from "~/hooks/nft";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { decodeShortString } from "starknet/dist/utils/shortString";
import BN from "bn.js";
import { Abi, Call } from "starknet";
import { useStore } from "src/store/store";
import { PaymasterAddress, starknetProvider, zeroGasExecute } from "src/lib/starknet-wallet";
import Erc721Abi from "~/abi/erc721.json";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";

const ExampleErc721Address =
  "0x014f90fe1c113d1054c5f420ebb3ab0e039c45d896453ed5059f39dca7e46ae0";

export default function MintCard() {
  const { contract: nft } = useNftContract(ExampleErc721Address);
  const { starknetStore } = useStore();
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
  };

  const freeMint = async () => {
    try {
      const erc721Call: Call = {
        contractAddress: ExampleErc721Address,
        entrypoint: "mint",
        calldata: [starknetStore.starknetAddress],
      };
      setIsMinting(true);
      onOpen(); // open the modal
      const erc721Result = await zeroGasExecute(
        starknetProvider,
        PaymasterAddress,
        starknetStore.starknetAddress,
        starknetStore.keyPair,
        [erc721Call],
        [Erc721Abi as Abi]
      );
      await starknetProvider.waitForTransaction(erc721Result.transaction_hash);
      console.log(erc721Result.transaction_hash);
      setIsMinting(false);
      onClose(); // close the modal
      toast({
        title: "Success",
        description: `Minted successfully! Tx:${erc721Result.transaction_hash}`,
        status: "success",
        position: "top",
        duration: 20000,
        isClosable: true,
      });
    } catch (error: any) {
      setIsMinting(false);
      onClose(); // close the modal
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

  function ButtonState() {
    if (isMinting) {
      return (
        <button className={styles.btnDisable}>
          <Spinner />
        </button>
      );
    } else {
      return (
        <button onClick={() => freeMint()} className={styles.btn}>
          Mint
        </button>
      );
    }
  }

  useEffect(() => {
    refreshAll();
  }, []);

  useEffect(() => {
    refreshTotalSupply();
  }, [isMinting]);

  return (
    <>
      <div className={styles.section}>
        <h1>ERC721 NFT</h1>
        <div className={styles.content}>
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
              NFT Name:&nbsp;
              {name ? (
                <span>{decodeFeltToStr(name[0])}</span>
              ) : (
                <Skeleton height="20px" />
              )}
            </h4>
            <h4>
              NFT Symbol:&nbsp;
              {symbol ? (
                <span>{decodeFeltToStr(symbol[0])}</span>
              ) : (
                <Skeleton height="20px" />
              )}
            </h4>
            <h4>
              Total Supply:&nbsp;
              {totalSupply ? (
                <span>{uint256ToBN(totalSupply[0]).toString()}</span>
              ) : (
                <Skeleton height="20px" />
              )}
            </h4>
            <h4>
              Mint Price:&nbsp;<span>0 ETH</span>
            </h4>
          </>
        </div>
        <ButtonState />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className={styles.modalContent}>
          <ModalCloseButton />
          <ModalBody className={styles.modalBody}>
            <Spinner />
            &nbsp; Minting...
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
