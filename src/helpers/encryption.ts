import * as crypto from 'crypto';

//Se encripta una clave usando SHA256.

export function encryptSHA256(secret: string): string {
    return crypto.createHash('sha256').update(secret).digest('hex');
}