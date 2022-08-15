import type { NextPage } from "next";
import { ConnectMetamask } from "~/components/ConnectMetamask";
import styles from "../../styles/Home.module.scss";
import Info from "~/components/Info";

const Home: NextPage = () => {
  return (
    <div className={styles.section}>
      <ConnectMetamask />
      <Info />
    </div>
  );
};

export default Home;
