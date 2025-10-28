import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';
import { encryptSHA256 } from './helpers/encryption';

// Carga el archivo .env correspondiente (ya cargado por env-cmd)
dotenv.config();

// Extendemos el test base de Playwright
const test = base.extend<{
    encryptedKey: string;
    environment: string;
}>({
    encryptedKey: async ({}, use) => {
        const secret = process.env.SECRET_KEY || '';
        const encrypted = encryptSHA256(secret);

        // Loguea antes de cada test (sin beforeEach)
        console.log(`Encrypted key (${process.env.ENVIRONMENT}):`, encrypted);
        await use(encrypted);
    },

    environment: async ({}, use) => {
        const env = process.env.ENVIRONMENT || 'UNKNOWN';
        await use(env);
    }
});

export { test };
export const expect = test.expect;
