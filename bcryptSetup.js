import * as Crypto from 'expo-crypto';
import bcrypt from 'bcryptjs';

function fallback(bytesAmount) {
    const typedArray = new Uint8Array(bytesAmount);
    Crypto.getRandomValues(typedArray);
    return typedArray;
};

bcrypt.setRandomFallback(fallback);

export default bcrypt;