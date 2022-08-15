import type { NextPage } from "next";
import { useMemo, useState, StrictMode, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectMetamask } from "~/components/ConnectMetamask";
import styles from "../../styles/Home.module.scss";
import { AccountStateEnum, useStore } from "../store/store";
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
    </div>
  );
};

export default Home;
