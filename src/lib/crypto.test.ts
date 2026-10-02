import { describe, it, expect } from 'vitest';
import { encrypt, decrypt } from './crypto';

describe('Encryption', () => {
  const mockKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

  it('encrypts and decrypts correctly', () => {
    const text = 'hello-spotify-token';
    const encrypted = encrypt(text, mockKey);
    const decrypted = decrypt(encrypted, mockKey);
    
    expect(decrypted).toBe(text);
    expect(encrypted).not.toBe(text);
  });

  it('throws error for invalid key', () => {
    expect(() => encrypt('test', 'short-key')).toThrow();
  });
});
