import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
import { useAccount } from "wagmi";
export enum AccountStateEnum {
  Unkown,
  ConnetedWithoutStarkKey,
  ConnetedHasStarkKey,
  EnabledZeroGas,
}

const starknetStore = () => {
  return makeAutoObservable({
    starknetAddress: "",
    accountState: AccountStateEnum.Unkown,
    setAccountState(
      isConnected: boolean,
      ConnetedHasStarkKey: boolean,
      EnabledZeroGas: boolean
    ) {
      console.log("setAccountState", this);
      if (isConnected && !ConnetedHasStarkKey && !EnabledZeroGas) {
        this.accountState = AccountStateEnum.ConnetedWithoutStarkKey;
      } else if (isConnected && ConnetedHasStarkKey && !EnabledZeroGas) {
        this.accountState = AccountStateEnum.ConnetedHasStarkKey;
      } else if (isConnected && ConnetedHasStarkKey && EnabledZeroGas) {
        this.accountState = AccountStateEnum.EnabledZeroGas;
      }
    },
  });
};

const store = {
  starknetStore: starknetStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

// export default {
//   StoreContext,
//   StoreProvider,
//   useStore,
// };
