import React, { useEffect, useState } from "react";
import styles from "../EnableZeroGas/enableZeroGas.module.scss";
import { BsLightningChargeFill } from "react-icons/bs";
import { AccountStateEnum, useStore } from "../../store/store";
import { observer } from "mobx-react";

function EnableZeroGas() {
  const [enable, setEnable] = useState(false);
  const { starknetStore } = useStore();

  useEffect(() => {
    if (enable) {
      starknetStore.setAccountState(true, true, true);
    }
  }, [enable]);

  function Enable() {
    setEnable(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        {/* <Spinner className={styles.icon} /> */}
        <BsLightningChargeFill className={styles.icon} />
      </div>
      <div className={styles.content}>
        {starknetStore.accountState == AccountStateEnum.ConnetedHasStarkKey ? (
          <button className={styles.btn} onClick={() => Enable()}>
            ②&nbsp;&nbsp;&nbsp;Enable zero gas fee
          </button>
        ) : (
          <button className={styles.btnDisable}>
            ②&nbsp;&nbsp;&nbsp;Enable zero gas fee
          </button>
        )}
        <h6>Active zero gas fee function for your hyper account </h6>
      </div>
    </div>
  );
}

export default observer(EnableZeroGas);
