import React from "react";
import styles from "../Authentication/authentication.module.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";

export default function Authentication() {
  return (
    <div className={styles.container}>
      <BsFillPersonCheckFill className={styles.icon} />

      <div className={styles.content}>
        <h4>Authentication</h4>
        <h6></h6>
      </div>
    </div>
  );
}
