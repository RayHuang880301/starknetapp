# StarkNet Hyper Account Kit
The StarkNet Hyper Account Kit is a toolkit designed to provide the best possible user experience on StarkNet. StarkNet Hyper Account Kit has the following two characteristics based on the proposals of **Account Abstration** (EIP-2938) and **Account Abstraction via Entry Point Contract Specification** (EIP-4337).


### In App Wallet
>Users can generate wallets directly within DApps without switching wallets, networks, or RPCs. Simply connect your MetaMask wallet to immediately create a wallet and sign transactions on StarkNet.

### Pay Master
>When users interact with the whitelisted gas-free contracts that specified by protocols, the gas fees will be paid by the Pay Master account of protocols.

Based on the foregoing, when developers apply StarkNet Hyper Account in their protocols, users can use any application on StarkNet without switching wallets or networks, as long as they use the MetaMask wallet, which greatly improves the user experience. Even more additional wallets can be supported, such as WalletConnect, Coinbase wallet, and so on. Users can generate a StarkNet account with key pairs based on their Ethereum address and continue to use their original wallet without installing a new wallet or changing RPC networks.

Furthermore, StarkNet Hyper Account Kit includes the pay master function; imagine how appealing it is to not have to pay gas fee when interacting with protocols on blockchain; StarkNet Hyper Account Kit did it.

For example, through the Pay-Master function, users can enjoy real free mint; the protocol can also provide users who register accounts in their application with the Pay Master function, or add a whitelist to pay gas fees for specific users and applications. It can be used in a variety of different scenarios depending on your protocol. StarkNet Hyper Account Kit assembled in-app wallet and pay-master functions that are extremely user friendly and desired!
### Demo

### Technical Docs





This is an example showing how to use StarkNet React with Next.js

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.# starknetapp
