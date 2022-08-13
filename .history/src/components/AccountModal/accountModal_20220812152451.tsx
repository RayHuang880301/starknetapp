import React from "react";
import styles from "../AccountModal/accountModal.module.scss";
import Authentication from "../Authentication/authentication";
import EnableZeroGas from "../EnableZeroGas/enableZeroGas";

export default function AccountModal() {
  return (
    <div className={styles.modal}>
      <div className={styles.title}></div>
      <div className={styles.card}>
        <Authentication />
      </div>
      <div className={styles.card}>
        <EnableZeroGas />
      </div>
    </div>
  );
}
