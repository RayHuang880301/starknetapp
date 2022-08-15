import { useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import React from "react";
import { useEffect } from "react";
import { useEthContract } from "~/hooks/eth";
import { useNftContract } from "~/hooks/nft";
import BN from "bn.js";
import styles from "./profileCard.module.scss";
import { useStore } from "../../store/store";
import { decodeShortString } from "starknet/dist/utils/shortString";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import Link from "next/link";
import { Skeleton } from "@chakra-ui/react";
import { nomalizeEth } from "src/lib/starknet-wallet";

const EthAddress =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const ExampleErc721Address =
  "0x014f90fe1c113d1054c5f420ebb3ab0e039c45d896453ed5059f39dca7e46ae0";

export default function ProfileCard() {
  const { starknetStore } = useStore();
  let starknetAddress = starknetStore.starknetAddress;
  const { contract: eth } = useEthContract(EthAddress);
  const { contract: nft } = useNftContract(ExampleErc721Address);

  const {
    data: ethBalance,
    loading: ethBalanceLoading,
    refresh: refreshEthBalance,
  } = useStarknetCall({
    contract: eth,
    method: "balanceOf",
    args: [starknetAddress],
  });

  const {
    data: balanceOf,
    loading: balanceOfLoading,
    refresh: refreshBalanceOf,
  } = useStarknetCall({
    contract: nft,
    method: "balanceOf",
    args: [starknetAddress],
  });

  useEffect(() => {
    refreshEthBalance();
    console.log("ethBalance", ethBalance);
    refreshBalanceOf();
  }, []);

  return (
    <div className={styles.section}>
      <h1>Profile</h1>
      <div className={styles.content}>
        <h4>
          Address:
          <br />
          <Link
            href={`https://goerli.voyager.online/contract/${starknetAddress}`}
          >
            <a target="_blank" rel="noreferrer">
              <span className={styles.address}>{starknetAddress}</span>
            </a>
          </Link>
        </h4>
        <h4>
          Balance:&nbsp;
          {ethBalance ? (
            <span>
              {nomalizeEth(uint256ToBN(ethBalance[0])).toString()}&nbsp;ETH
            </span>
          ) : (
            <Skeleton height="20px" />
          )}
        </h4>
        <h4>
          Balance of NFT:&nbsp;
          {balanceOf ? (
            <span>{uint256ToBN(balanceOf[0]).toString()}</span>
          ) : (
            <Skeleton height="20px" />
          )}
        </h4>
      </div>
    </div>
  );
}
