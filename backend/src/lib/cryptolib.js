import { randomBytes } from 'crypto';

export const generateSalt = (length = 16) => {
    return randomBytes(length).toString('hex');
};