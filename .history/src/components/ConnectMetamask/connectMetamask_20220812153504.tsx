import { useEffect, useState } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import styles from "../ConnectMetamask/connectMetamask.module.scss";

export default function ConnectMetamask() {
  const { address, isConnected } = useAccount();
  const { profile, setProfile } = useState(undefined);
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
  }, [address, profile, setProfile]);

  if (isConnected)
    return (
      <button className={styles.address} onClick={() => disconnect()}>
        {ensName ?? profile}
      </button>
    );
  return (
    <button className={styles.connectBtn} onClick={() => connect()}>
      Connect
    </button>
  );
}
