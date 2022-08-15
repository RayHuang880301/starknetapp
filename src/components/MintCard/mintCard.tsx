import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect } from "react";
import styles from "./mintCard.module.scss";
// import { NftContract } from "../NftContract/NftContract";
import { useNftContract } from "~/hooks/nft";

export default function MintCard() {
  const { contract: nft } = useNftContract();

  const { data: name, refresh: refreshName } = useStarknetCall({
    contract: nft,
    method: "name",
    args: [],
  });

  const { data: symbol, refresh: refreshSymbol } = useStarknetCall({
    contract: nft,
    method: "symbol",
    args: [],
  });

  const { data: totalSupply, refresh: refreshTotalSupply } = useStarknetCall({
    contract: nft,
    method: "totalSupply",
    args: [],
  });

  useEffect(() => {
    refreshName();
    refreshSymbol();
    refreshTotalSupply();
  }, []);

  return (
    <div className={styles.section}>
      <h1>ERC721 NFT</h1>
      <div className={styles.content}>
        <h4>Contract Address:</h4>
        <br />
        <h4>NFT Name:{name}</h4>
        <br />
        <h4>NFT Symbol:{symbol}</h4>
        <br />
        <h4>Total Supply:{totalSupply}</h4>
        <br />
        <h4>Mint Price: 0 ETH</h4>
      </div>
      <button className={styles.btn}>Mint</button>
    </div>
  );
}
