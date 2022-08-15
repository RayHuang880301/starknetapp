import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
import { useAccount } from "wagmi";
import Storage from 'store2';
import { setStarknetAccountAddress } from '../lib/Storage';
import { KeyPair } from "starknet";

export enum AccountStateEnum {
  Unkown,
  ConnetedWithoutStarkKey,
  ConnetedHasStarkKey,
  EnabledZeroGas,
}

const starknetStore = () => {
  return makeAutoObservable({
    keyPair: null as KeyPair | undefined,
    starknetAddress: "",
    setStarknetAddress(publickey: string, starkKey: string) {
      console.log('starknetAddress', starkKey)
      this.starknetAddress = starkKey;
      setStarknetAccountAddress(publickey, starkKey);
    },
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
