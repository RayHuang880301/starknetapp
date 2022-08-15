import React, { useEffect } from "react";
import styles from "./payMasterCard.module.scss";
import { useStarknetCall } from "@starknet-react/core";
import BN from "bn.js";
import { decodeShortString } from "starknet/dist/utils/shortString";
import { useEthContract } from "~/hooks/eth";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import Link from "next/link";
import { Skeleton } from "@chakra-ui/react";
import { nomalizeEth } from "src/lib/starknet-wallet";


export default function PayMasterCard() {
  const { contract: eth } = useEthContract(EthAddress);

  const {
    data: balance,
    loading: balanceLoading,
    refresh: refreshBalance,
  } = useStarknetCall({
    contract: eth,
    method: "balanceOf",
    args: [
      PaymasterAddress,
    ],
  });

  useEffect(() => {
    refreshBalance();
  }, []);

  const decodeFeltToStr = (str: BN) => {
    return decodeShortString(str.toString("hex"));
  };
  return (
    <div className={styles.section}>
      <h1>Pay Master</h1>
      <div className={styles.content}>
        <h4>
          Pay Master Address:&nbsp;
          <br />
          <Link
            href={`https://goerli.voyager.online/contract/${PaymasterAddress}`}
          >
            <a target="_blank" rel="noreferrer">
              <span className={styles.address}>{PaymasterAddress}</span>
            </a>
          </Link>
        </h4>
        <h4>
          Balance:&nbsp;
          {balance ? (
            <span>
              {nomalizeEth(uint256ToBN(balance[0])).toString()}&nbsp;ETH
            </span>
          ) : (
            <Skeleton height="20px" />
          )}
        </h4>
      </div>
    </div>
  );
}
