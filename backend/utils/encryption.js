import crypto from "crypto";
import fs from "fs";
import path from "path";

// AES-256 Encryption
const AES_ALGORITHM = "aes-256-cbc";
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "../keys/public.pem"), "utf8");
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "../keys/private.pem"), "utf8");

// Encrypt file
export const encryptFile = (fileBuffer) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(AES_ALGORITHM, key, iv);

  let encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

  // Encrypt AES key with RSA
  const encryptedKey = crypto.publicEncrypt(RSA_PUBLIC_KEY, key);

  return { encryptedFile: encrypted, encryptedKey, iv };
};

// Decrypt file
export const decryptFile = (encryptedFile, encryptedKey, iv) => {
  const key = crypto.privateDecrypt(RSA_PRIVATE_KEY, encryptedKey);
  const decipher = crypto.createDecipheriv(AES_ALGORITHM, key, iv);

  let decrypted = Buffer.concat([decipher.update(encryptedFile), decipher.final()]);
  return decrypted;
};
