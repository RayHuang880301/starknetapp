import Storage from 'store2';

export const STARK_KEY_STORAGE = 'STARK_KEY_STORAGE';


export function getStarknetAccountAddressByPublicKey(publicKey: string) {
    return Storage.get(`${STARK_KEY_STORAGE}_${publicKey}`) || '';
}

export function setStarknetAccountAddress(publicKey: string, starkKey: string) {
    return Storage.set(`${STARK_KEY_STORAGE}_${publicKey}`, starkKey);
}