import React, { useEffect } from "react";
import styles from "./payMasterCard.module.scss";
import { useStarknetCall } from "@starknet-react/core";
import BN from "bn.js";
import { decodeShortString } from "starknet/dist/utils/shortString";
import { useEthContract } from "~/hooks/eth";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import Link from "next/link";

const EthAddress =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const PaymasterAddress =
  "0x071ddc64f54b771fe9a9fb38e9922328988da6b96674eac0e40ab39571375614";

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
      "0x071ddc64f54b771fe9a9fb38e9922328988da6b96674eac0e40ab39571375614",
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
          {balance && <span>{uint256ToBN(balance[0]).toString()}</span>}
        </h4>
      </div>
    </div>
  );
}
