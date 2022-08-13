import { useStarknetCall } from "@starknet-react/core";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { toBN } from "starknet/dist/utils/number";
import { useAccount } from "wagmi";
import AccountModal from "~/components/AccountModal/accountModal";
import ConnectMetamask from "~/components/ConnectMetamask/connectMetamask";
import { ConnectWallet } from "~/components/ConnectWallet";
import { IncrementCounter } from "~/components/IncrementCounter";
import { TransactionList } from "~/components/TransactionList";
import { useCounterContract } from "~/hooks/counter";
import styles from "../styles/Home.module.scss";
import { ScaleFade, useDisclosure } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [watch, setWatch] = useState(true);
  const { address, isConnected } = useAccount();
  const { contract: counter } = useCounterContract();

  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: "counter",
    args: [],
    options: { watch },
  });

  const counterValue = useMemo(() => {
    if (counterResult && counterResult.length > 0) {
      const value = toBN(counterResult[0]);
      return value.toString(10);
    }
  }, [counterResult]);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className={styles.section}>
      {/* <h2>Wallet</h2>
      <ConnectWallet /> */}
      <ConnectMetamask />
      {/* {isConnected && (
        <ScaleFade initialScale={0.9} in={isOpen}>
          <AccountModal />
        </ScaleFade>
      )} */}
      {/* <h2>Counter Contract</h2>
      <p>Address: {counter?.address}</p>
      <p>Value: {counterValue}</p>
      <p>
        <span>
          Refresh value at every block{' '}
          <input type="checkbox" checked={watch} onChange={(evt) => setWatch(evt.target.checked)} />
        </span>
      </p>
      <IncrementCounter />
      <h2>Recent Transactions</h2>
      <TransactionList /> */}
    </div>
  );
};

export default Home;
