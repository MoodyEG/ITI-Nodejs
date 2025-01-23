import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const message = 'Hello, world!';

const encryptedMessage = CryptoJS.AES.encrypt(
  message,
  process.env.SECRET_KEY
).toString();

const decryptedMessage = CryptoJS.AES.decrypt(
  encryptedMessage,
  process.env.SECRET_KEY
).toString(CryptoJS.enc.Utf8);

console.log(encryptedMessage);
console.log(decryptedMessage);
