import { useStarknetInvoke } from "@starknet-react/core";
import React from "react";
import { useEffect } from "react";
import { useEthContract } from "~/hooks/eth";
import { useNftContract } from "~/hooks/nft";
import styles from "./profileCard.module.scss";
import { useStore } from "../../store/store";

export default function ProfileCard() {
  const { starknetStore } = useStore();
  let starknetAddress = starknetStore.starknetAddress;
  console.log(starknetAddress);
  const { contract: ethContract } = useEthContract();
  const { contract: nftContract } = useNftContract();
  const { invoke } = useStarknetInvoke({
    contract: ethContract,
    method: "balanceOf",
  });

  useEffect(() => {
    invoke({
      args: [""],
      metadata: {
        method: "balanceOf",
        message: "eth balance",
      },
    });
  }, []);

  return (
    <div className={styles.section}>
      <h1>Profile</h1>
      <div className={styles.content}>
        <h4>
          Address:
          <br />
          {starknetAddress}
        </h4>
        <br />
        <h4>Balance:</h4>
        <br />
        <h4>Balance of NFT:</h4>
      </div>
    </div>
  );
}
