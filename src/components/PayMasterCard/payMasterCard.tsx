import React from "react";
import styles from "./payMasterCard.module.scss";
import { useStarknetCall } from "@starknet-react/core";

export default function PayMasterCard() {
  return (
    <div className={styles.section}>
      <h1>Pay Master</h1>
      <div className={styles.content}>
        <h4>Vault Address:</h4>
        <br />
        <h4>Balance:</h4>
      </div>
    </div>
  );
}
