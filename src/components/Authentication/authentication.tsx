import React, { useEffect, useMemo, useState } from "react";
import styles from "../Authentication/authentication.module.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Spinner, useToast } from "@chakra-ui/react";
import { useSignTypedData } from "wagmi";
import {
  generateStarkKeyPair,
  createStarkKey,
  starknetProvider,
} from "src/lib/starknet-wallet";
import { getStarkKey } from "starknet/dist/utils/ellipticCurve";
import { useStore } from "../../store/store";
import { getStarknetAccountAddressByPublicKey } from "../../lib/Storage";
import Link from "next/link";

const domain = {
  name: "Sign Message",
  version: "1",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

const types = {
  Main: [
    { name: "Authentication", type: "string" },
    { name: "Action", type: "string" },
  ],
};

const value = {
  Authentication: "StarkNet Hyper Account",
  Action: "Access to generate your in-app starknet wallet",
};

export default function Authentication() {
  enum AccountState {
    unCreated,
    creating,
    created,
  }
  const toast = useToast();
  const { starknetStore } = useStore();
  const [starknetAddress, setStarKnetAddress] = useState<string>("");
  const [accountState, setAccountState] = useState<AccountState>(
    AccountState.unCreated
  );
  const statuses = ["success", "error", "warning", "info"];
  const {
    data: signedData,
    isError,
    isLoading,
    isSuccess,
    signTypedData,
  } = useSignTypedData({
    domain,
    types,
    value,
  });

  function createAccount() {
    signTypedData();
  }

  useEffect(() => {
    if (accountState == AccountState.created) {
      starknetStore.setAccountState(true, true, false);
    }
  }, [accountState]);

  useEffect(() => {
    if (isSuccess) {
      setAccountState(AccountState.creating);
      const keyPair = generateStarkKeyPair(String(signedData));
      starknetStore.keyPair = keyPair;
      const puclicKey = getStarkKey(keyPair);
      const starkKey = getStarknetAccountAddressByPublicKey(puclicKey);
      if (starkKey) {
        setStarKnetAddress(starkKey);
        starknetStore.setStarknetAddress(puclicKey, starkKey);
        setAccountState(AccountState.created);
        toast({
          title: "Success",
          description: "Account created successfully",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      } else {
        createStarkKey(puclicKey).then((result) => {
          console.log(result);
          setStarKnetAddress(result.contract_address);
          starknetStore.setStarknetAddress(puclicKey, result.contract_address);
          starknetProvider
            .waitForTransaction(result.transaction_hash)
            .then(() => {
              setAccountState(AccountState.created);
              toast({
                title: "Success",
                description: "Account created successfully",
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true,
              });
            });
        });
      }
    } else if (isError) {
      toast({
        title: "Error",
        description: "Message not signed",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [signedData]);

  function ButtonState() {
    if (accountState == AccountState.unCreated) {
      return (
        <button className={styles.btn} onClick={() => createAccount()}>
          <span>①&nbsp;&nbsp;&nbsp;Authentication</span>
        </button>
      );
    } else if (accountState == AccountState.creating) {
      return (
        <button className={styles.btnEnable}>
          <span>①&nbsp;&nbsp;&nbsp;Estimated ~1 min</span>
        </button>
      );
    } else {
      return (
        <button className={styles.btnCreated}>
          <span>①&nbsp;&nbsp;&nbsp;Success</span>
        </button>
      );
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        {accountState == AccountState.creating ? (
          <Spinner className={styles.icon} />
        ) : (
          <BsFillPersonCheckFill
            className={styles.icon}
            style={
              accountState == AccountState.created
                ? { color: "#00D6C1" }
                : { color: "#FFF" }
            }
          />
        )}
      </div>
      <div className={styles.content}>
        <ButtonState />
        <h6>One time signature to generate your in-app starknet wallet</h6>
        {accountState == AccountState.created ? (
          <div className={styles.account}>
            <div>
              Address:
              <br />
              <Link
                href={`https://goerli.voyager.online/contract/${starknetAddress}`}
              >
                <a target="_blank" rel="noreferrer">
                  <span className={styles.address}>{starknetAddress}</span>
                </a>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
