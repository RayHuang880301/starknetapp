import {
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

export const starknetProvider = new Provider({
    sequencer: {
        network: 'goerli-alpha',
        // network: 'mainnet-alpha',
    },
});

export async function generateStarkKeyPair(hexString: string) {
    const pwk = number.toFelt(hexString);
    const keyPair = ec.getKeyPair(pwk);
    return keyPair;
}

export async function createStarkKey(publicKey: string) {
    const OpAccountRaw = require('./Account.json');
    const result = await starknetProvider.deployContract({
        contract: OpAccountRaw,
        constructorCalldata: [publicKey],
    });
    const receipt = await starknetProvider.waitForTransaction(result.transaction_hash);
    return result.contract_address;
}
