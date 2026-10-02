import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts a string using AES-256-GCM.
 * The key must be 32 bytes (256 bits).
 */
export function encrypt(text: string, keyHex: string): string {
  if (!keyHex || keyHex.length !== 64) {
    throw new Error('Encryption key must be a 64-character hex string (32 bytes).');
  }

  const key = Buffer.from(keyHex, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

/**
 * Decrypts a string using AES-256-GCM.
 */
export function decrypt(cipherText: string, keyHex: string): string {
  if (!keyHex || keyHex.length !== 64) {
    throw new Error('Encryption key must be a 64-character hex string (32 bytes).');
  }

  const key = Buffer.from(keyHex, 'hex');
  const data = Buffer.from(cipherText, 'base64');

  const iv = data.subarray(0, IV_LENGTH);
  const tag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
