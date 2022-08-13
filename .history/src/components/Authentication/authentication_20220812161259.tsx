import React from "react";
import styles from "../Authentication/authentication.module.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";

export default function Authentication() {
  return (
    <div>
      <div className={styles.icon}>
        <BsFillPersonCheckFill />
      </div>
      <div>
        <h4>Authentication</h4>
      </div>
    </div>
  );
}
