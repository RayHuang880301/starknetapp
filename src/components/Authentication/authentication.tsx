import React, { useEffect, useState } from "react";
import styles from "../Authentication/authentication.module.scss";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Spinner, useToast } from "@chakra-ui/react";
import { useAccount, useSignTypedData } from "wagmi";

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
  const toast = useToast();
  const { address, isConnected } = useAccount();
  const statuses = ["success", "error", "warning", "info"];
  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value,
    });
  console.log("Authentication");

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Message signed",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      console.log(data);
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

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        {(isLoading && <Spinner className={styles.icon} />) || (
          <BsFillPersonCheckFill
            className={styles.icon}
            // style={isSuccess && { color: "#38A169" }}
          />
        )}
      </div>
      <div className={styles.content}>
        <button className={styles.btn} onClick={() => signTypedData()}>
          Authentication
        </button>
        <h6>One time signature to authenticate your account</h6>
      </div>
    </div>
  );
}
function SignMsg() {
  throw new Error("Function not implemented.");
}
