import { type CreateStorageParams, initStorage } from './cache.storage';

import { getStorageShortName } from '~~/app/utils/env';
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '~~/app/cipher/cipher.entity';

export type CacheOptions = Partial<CreateStorageParams>;

function createOptions(
  { storage, options = {} }:
  {
    storage: Storage;
    options?: CacheOptions;
  },
): CacheOptions {
  return {
    // No encryption in debug mode
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
}

export const WebStorage = initStorage(
  createOptions({ storage: sessionStorage }),
);

export function createStorage(
  {
    storage = sessionStorage,
    options = {},
  }:
  {
    storage: Storage;
    options?: CacheOptions;
  },
) {
  return initStorage(createOptions({ storage, options }));
}

export function createSessionStorage(options: CacheOptions = {}) {
  return createStorage({
    storage: sessionStorage,
    options: { ...options, timeout: DEFAULT_CACHE_TIME },
  });
}

export function createLocalStorage(options: CacheOptions = {}) {
  return createStorage({
    storage: localStorage,
    options: { ...options, timeout: DEFAULT_CACHE_TIME },
  });
}
