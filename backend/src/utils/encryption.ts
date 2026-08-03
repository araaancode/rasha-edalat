import CryptoJS from 'crypto-js';
import { env } from '../config/env';

const key = env.encryption.key;

export function encrypt(text: string): string {
  if (!text) return text;
  try {
    return CryptoJS.AES.encrypt(text, key).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
}

export function decrypt(encryptedText: string): string {
  if (!encryptedText) return encryptedText;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText;
  }
}