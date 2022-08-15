# StarkNet Hyper Account Kit
The StarkNet Hyper Account Kit is a toolkit designed to provide the best possible user experience on StarkNet. StarkNet Hyper Account Kit has the following two characteristics based on the proposals of **Account Abstration** (EIP-2938) and **Account Abstraction via Entry Point Contract Specification** (EIP-4337).


### In-App Wallet
>Users can generate wallets directly within DApps without switching wallets, networks, or RPCs. Simply connect your MetaMask wallet to immediately create a wallet and sign transactions on StarkNet.

### Pay-Master
>When users interact with the whitelisted gas-free contracts that specified by protocols, the gas fees will be paid by the Pay Master account of protocols.

<br/>

### Description
>Based on the foregoing, when developers apply StarkNet Hyper Account in their protocols, users can use any application on StarkNet without switching wallets or networks, as long as they use the MetaMask wallet, which greatly improves the user experience. Even more additional wallets can be supported, such as WalletConnect, Coinbase wallet, and so on. Users can generate a StarkNet account with key pairs based on their Ethereum address and continue to use their original wallet without installing a new wallet or changing RPC networks.
>
>Furthermore, StarkNet Hyper Account Kit includes the pay master function; imagine how appealing it is to not have to pay gas fee when interacting with protocols on blockchain; StarkNet Hyper Account Kit did it.
>
>For example, through the Pay-Master function, users can enjoy real free mint; the protocol can also provide users who register accounts in their application with the Pay Master function, or add a whitelist to pay gas fees for specific users and applications. It can be used in a variety of different scenarios depending on your protocol. StarkNet Hyper Account Kit assembled in-app wallet and pay-master functions that are extremely user friendly and desired!

### Demo

### Technical Docs

#### Paymaster

##### Cairo contracts
- [PaymasterV2Account.cairo](contracts/PaymasterV2Account.cairo)
- [PaymasterV3Account.cairo](contracts/PaymasterV3Account.cairo)
##### Typescript
Demo code in V2 version
```
export async function zeroGasExecute(
    starknetProvider: Provider,
    paymasterAddress: string,
    accountAddress: string,
    keyPair: KeyPair,
    calls: Call[],
    abis: Abi[],
) {
    const paymasterAccount = new Account(
        starknetProvider,
        paymasterAddress,
        keyPair,
    );
    const account = new Account(
        starknetProvider,
        accountAddress,
        keyPair,
    );
    const nonce = await account.getNonce();
    const result = await paymasterAccount.execute([
        {
            contractAddress: accountAddress,
            entrypoint: '__execute__',
        },
        ...calls,
    ], [
        [{
            inputs: [],
            name: '__execute__',
            outputs: [],
            type: 'function',
        }],
        ...abis,
    ], {
        nonce,
    });

    return result;
}
```
---
Deomo code in V3 version
```
export async function zeroGasExecute(
    starknetProvider: Provider,
    paymasterAddress: string,
    accountAddress: string,
    keyPair: KeyPair,
    calls: Call[],
    abis: Abi[],
) {
    const account = new Account(
        starknetProvider,
        accountAddress,
        keyPair,
    );
    const result = await account.execute([
        {
            contractAddress: paymasterAddress,
            entrypoint: '__execute_paymaster__',
        },
        ...calls,
    ], [
        [{
            inputs: [],
            name: '__execute_paymaster__',
            outputs: [],
            type: 'function',
        }],
        ...abis,
    ]);

    return result;
}
```

#### In application Wallet
1. Connect Ethereum wallet
2. Sign typed data(EIP712)
```
const domain = {
  name: "Sign Message",
  version: "1",
  chainId: chain.goerli.id,
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

const signature = await ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [from, JSON.stringify({domain, types, value})],
});
```
3. Generate Stark KeyPair from signature
```
import {ec} from 'starknet';
const keyPair = generateStarkKeyPair(String(signature));

function generateStarkKeyPair(hexString: string) {
    const pwk = number.toFelt(hexString);
    const keyPair = ec.getKeyPair(pwk);
    return keyPair;
}
```

4. Get Account address, deploy new account if first use 
```
import { getStarkKey } from "starknet/dist/utils/ellipticCurve";

const puclicKey = getStarkKey(keyPair);
const { contract_address } = await starknetProvider.deployContract({
    contract: AccountContractRaw,
    constructorCalldata: [publicKey],
    addressSalt: publicKey
});
```

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.# starknetapp
