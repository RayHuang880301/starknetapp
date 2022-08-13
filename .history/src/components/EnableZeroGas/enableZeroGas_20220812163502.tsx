import React from "react";
import styles from "../EnableZeroGas/enableZeroGas.module.scss";

export default function EnableZeroGas() {
  return (
    <div className={styles.container}>
      <BsFillPersonCheckFill className={styles.icon} />
      <div className={styles.content}>
        <h4>Authentication</h4>
        <h6>One time signature to authenticate your account</h6>
      </div>
    </div>
  );
}
