import BN from 'bn.js';
import {
    Abi,
    Account,
    Call,
    Contract,
    // defaultProvider,
    ec,
    Invocation,
    json,
    KeyPair,
    number,
    Provider,
    RawCalldata,
} from 'starknet';
import axios from 'axios';
import { utils } from 'ethers';

export const EthAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const PaymasterAddress = "0x071ddc64f54b771fe9a9fb38e9922328988da6b96674eac0e40ab39571375614";

export const starknetProvider = new Provider({
    sequencer: {
        network: 'goerli-alpha',
        // network: 'mainnet-alpha',
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
        url: '/Account.txt',
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