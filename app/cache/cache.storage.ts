import { isUnset } from '@vinicunca/js-utilities';

import { AesEncryption, type EncryptionParams } from '~~/app/cipher/encryption';
import { cacheCipher } from '~~/app/cipher/cipher.entity';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: number | null;
}

export function initStorage(
  {
    prefixKey = '',
    storage = sessionStorage,
    key = cacheCipher.key,
    iv = cacheCipher.iv,
    timeout = null,
    hasEncrypt = true,
  }: Partial<CreateStorageParams> = {},
) {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /**
   * Cache class
   * Construction parameters can be passed into sessionStorage, localStorage,
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    set(
      { key, value, expire = timeout }:
      {
        key: string;
        value: any;
        expire?: number | null;
      },
    ) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isUnset(expire) ? new Date().getTime() + expire * 1000 : null,
      });

      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;

      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    get(
      { key, def = null }:
      { key: string; def?: any },
    ) {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) {
        return def;
      }

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isUnset(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (err) {
        return def;
      }
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    clear(): void {
      this.storage.clear();
    }
  };

  return new WebStorage();
}
