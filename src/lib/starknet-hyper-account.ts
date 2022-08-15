import BN from 'bn.js';
import {
    Abi,
    Account,
    Call,
    ec,
    json,
    KeyPair,
    number,
    Provider,
} from 'starknet';
import axios from 'axios';
import { utils } from 'ethers';

export const EthAddress: string = process.env.NEXT_PUBLIC_ETH_ADDRESS || '';
export const PaymasterAddress: string = process.env.NEXT_PUBLIC_PAYMASTER_ADDRESS || '';
export const starknetProvider = new Provider({
    sequencer: {
        // TODO: just for testnet
        network: 'goerli-alpha',
    },
});

export function nomalizeEth(rawEth: BN) {
    return utils.formatEther(rawEth.toString());
}


export function generateStarkKeyPair(hexString: string) {
    const pwk = number.toFelt(hexString);
    const keyPair = ec.getKeyPair(pwk);
    return keyPair;
}

export async function createStarkKey(publicKey: string) {
    const raw = await axios({
        method: 'get',
        headers: {
            'Content-Type': 'text/plain',
        },
        transformResponse: (res) => {
            return res
        },
        url: './Account.txt',
    })

    const AccountContractRaw = json.parse(raw.data)
    const result = await starknetProvider.deployContract({
        contract: AccountContractRaw,
        constructorCalldata: [publicKey],
        addressSalt: publicKey
    });
    const receipt = await starknetProvider.waitForTransaction(result.transaction_hash);
    return result;
}

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