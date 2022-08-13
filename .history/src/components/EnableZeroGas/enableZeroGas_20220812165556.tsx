import React from "react";
import styles from "../EnableZeroGas/enableZeroGas.module.scss";
import { BsLightningChargeFill } from "react-icons/bs";

export default function EnableZeroGas() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <BsLightningChargeFill className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h4>Enable zero gas fee</h4>
        <h6>One time signature to authenticate your account</h6>
      </div>
    </div>
  );
}
