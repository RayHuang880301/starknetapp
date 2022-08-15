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
        url: 'https://raw.githubusercontent.com/RayHuang880301/starknetapp/main/src/lib/Account.txt',
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

async function main() {
    const pwk = '0x05a5db39c6aab6f65be0fafef2997632942bac3dda5af598e968e9d214298be0';
    const keyPair = generateStarkKeyPair(pwk);
    let puclicKey = getStarkKey(keyPair);

    console.log(puclicKey)
    const result = await createStarkKey(puclicKey);
    console.log(result);
    await starknetProvider.waitForTransaction(result.transaction_hash);
    console.log('SCC')
}

// main().then(() => {
//     process.exit(0);
// }).catch(err => {
//     console.error(err);
//     process.exit(1);
// })

function stringToAscii(str: string) {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return arr;
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
    ]);

    return result;
}