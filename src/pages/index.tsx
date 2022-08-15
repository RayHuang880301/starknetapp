import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useMemo, useState, StrictMode, useEffect } from "react";
import { toBN } from "starknet/dist/utils/number";
import { useAccount } from "wagmi";
import AccountModal from "~/components/AccountModal/accountModal";
import { ConnectMetamask } from "~/components/ConnectMetamask";
import { ConnectWallet } from "~/components/ConnectWallet";
import MintCard from "~/components/MintCard/mintCard";
import ProfileCard from "~/components/ProfileCard/profileCard";
import { TransactionList } from "~/components/TransactionList";
import PayMasterCard from "~/components/PayMasterCard/payMasterCard";
import styles from "../../styles/Home.module.scss";
import { AccountStateEnum, useStore } from "../store/store";
import EnableZeroGas from "~/components/EnableZeroGas/enableZeroGas";
import { Observer, observer } from "mobx-react"; // Or "mobx-react".
import { autorun } from "mobx";
import Info from "~/components/Info";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [watch, setWatch] = useState(true);
  const { starknetStore } = useStore();

  return (
    <div className={styles.section}>
      {/* <ConnectWallet /> */}
      <ConnectMetamask />
      <Info />
      {/* <div>
        <h2>Counter Contract</h2>
        <p>Address: {counter?.address}</p>
        <p>Value: {counterValue}</p>
        <p>
          <span>
            Refresh value at every block{" "}
            <input
              type="checkbox"
              checked={watch}
              onChange={(evt) => setWatch(evt.target.checked)}
            />
          </span>
        </p>
        <IncrementCounter />
        <h2>Recent Transactions</h2>
        <TransactionList />
      </div> */}
    </div>
  );
};

export default Home;
