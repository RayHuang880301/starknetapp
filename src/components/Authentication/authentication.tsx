import React from "react";
import styles from "../Authentication/authentication.module.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Spinner } from "@chakra-ui/react";

export default function Authentication() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <Spinner className={styles.icon} />
        {/* <BsFillPersonCheckFill className={styles.icon} /> */}
      </div>
      <div className={styles.content}>
        <h4>Authentication</h4>
        <h6>One time signature to authenticate your account</h6>
      </div>
    </div>
  );
}
