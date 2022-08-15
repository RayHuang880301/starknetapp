import { observer } from "mobx-react-lite";
import { AccountStateEnum, useStore } from "src/store/store";
import AccountModal from "./AccountModal/accountModal";
import MintCard from "./MintCard/mintCard";
import PayMasterCard from "./PayMasterCard/payMasterCard";
import ProfileCard from "./ProfileCard/profileCard";
import styles from "../../styles/Home.module.scss";

function Info() {
  const { starknetStore } = useStore();

  if (starknetStore.accountState === AccountStateEnum.EnabledZeroGas) {
    return (
      <div className={styles.cardBox}>
        <PayMasterCard />
        <ProfileCard />
        <MintCard />
      </div>
    );
  } else if (
    starknetStore.accountState === AccountStateEnum.ConnetedWithoutStarkKey ||
    starknetStore.accountState === AccountStateEnum.ConnetedHasStarkKey
  ) {
    return <AccountModal />;
  } else {
    return <></>;
  }
}

export default observer(Info);
