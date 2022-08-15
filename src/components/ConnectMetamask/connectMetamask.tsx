import { useEffect, useState } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import styles from "../ConnectMetamask/connectMetamask.module.scss";
import { useStore } from "../../store/store";
import { observer, Observer } from "mobx-react";

function ConnectMetamask() {
  const { starknetStore } = useStore();
  const { address, isConnected } = useAccount();
  const [profile, setProfile] = useState<String>();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (address) {
      let str = address.slice(0, 6) + `...` + address.slice(-4);
      setProfile(str);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected) {
      starknetStore.setAccountState(true, false, false);
    }
  }, [isConnected, starknetStore]);

  if (isConnected)
    return (
      <>
        <button className={styles.address} onClick={() => disconnect()}>
          {ensName ?? profile}
        </button>
      </>
    );
  return (
    <div className={styles.container}>
      <h1>StarkNet Hyper Account</h1>
      <button className={styles.connectBtn} onClick={() => connect()}>
        Connect
      </button>
    </div>
  );
}

export default observer(ConnectMetamask);
