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
import { getStarkKey } from 'starknet/dist/utils/ellipticCurve';
import axios from 'axios';

export const starknetProvider = new Provider({
    sequencer: {
        network: 'goerli-alpha',
        // network: 'mainnet-alpha',
    },
});

const ETH_DECIMALS = 18;

export function nomalizeEth(rawEth: BN) {
    return rawEth.div(new BN('10').pow(new BN(ETH_DECIMALS)));
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