import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import styles from "../ConnectMetamask/connectMetamask.module.scss";

export default function ConnectMetamask() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <button className={styles.address} onClick={() => disconnect()}>
        {ensName ?? address}
      </button>
    );
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
