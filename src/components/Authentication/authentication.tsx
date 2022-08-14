import React, { useEffect, useState } from "react";
import styles from "../Authentication/authentication.module.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Spinner, useToast } from "@chakra-ui/react";
import { useAccount, useSignTypedData } from "wagmi";
import {
  generateStarkKeyPair,
  createStarkKey,
  starknetProvider,
} from "src/lib/starknet-wallet";
import { getStarkKey } from "starknet/dist/utils/ellipticCurve";
import { BigNumberish } from "starknet/dist/utils/number";

const domain = {
  name: "Sign message",
  version: "1",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

const types = {
  Main: [
    { name: "Authentication", type: "string" },
    { name: "action", type: "string" },
  ],
};

const value = {
  Authentication: "StarkNet ...",
  action: "Access to create your account",
};

export default function Authentication() {
  enum AccountState {
    unCreated = 0,
    creating = 1,
    created = 2,
  }
  const toast = useToast();
  const { address, isConnected } = useAccount();
  const [accountState, setAccountState] = useState<AccountState>(0);
  const statuses = ["success", "error", "warning", "info"];
  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value,
    });

  function createAccount() {
    setAccountState(1);
    signTypedData();
  }

  useEffect(() => {
    if (isSuccess) {
      let keyPair = generateStarkKeyPair(String(data));
      console.log(keyPair);
      let puclicKey = getStarkKey(keyPair);
      // console.log(puclicKey);
      createStarkKey(puclicKey).then((result) => {
        // console.log(result);
        starknetProvider
          .waitForTransaction(result.transaction_hash)
          .then(() => {
            setAccountState(2);
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
  }, [isSuccess, isError, toast, data]);

  function ButtonState() {
    if (accountState == 0) {
      return (
        <button className={styles.btn} onClick={() => createAccount()}>
          <span>①&nbsp;&nbsp;&nbsp;Authentication</span>
        </button>
      );
    } else if (accountState == 1) {
      return (
        <button className={styles.btnEnable}>
          <span>①&nbsp;&nbsp;&nbsp;Estimated ~1 min</span>
        </button>
      );
    } else {
      return (
        <button className={styles.btnCreated}>
          <span>①&nbsp;&nbsp;&nbsp;Successful create</span>
        </button>
      );
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        {accountState == 1 ? (
          <Spinner className={styles.icon} />
        ) : (
          <BsFillPersonCheckFill
            className={styles.icon}
            style={accountState == 2 ? { color: "#00D6C1" } : { color: "#FFF" }}
          />
        )}
      </div>
      <div className={styles.content}>
        <ButtonState />
        <h6>One time signature to authenticate your account</h6>
      </div>
    </div>
  );
}
function SignMsg() {
  throw new Error("Function not implemented.");
}
