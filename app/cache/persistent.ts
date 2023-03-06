import { type RouteLocationNormalized } from 'vue-router';
import { toRaw } from 'vue';
import { omitProps, pickProps } from '@vinicunca/js-utilities';

import { APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, LOCK_INFO_KEY, type MULTIPLE_TABS_KEY, type PROJ_CFG_KEY, type ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from './cache.entity';
import { DEFAULT_CACHE_TIME } from '../cipher/cipher.entity';
import { Memory } from './cache.memory';

import { createLocalStorage, createSessionStorage } from '.';

import { type LockInfo, type UserInfo } from '~~/app/auth/auth.entity';
import { type ProjectConfig } from '~~/app/system/system.type';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
}

type LocalStore = BasicStore;

type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

export function initPersistentMemory() {
  const localCache = ls.get({ key: APP_LOCAL_CACHE_KEY });
  const sessionCache = ss.get({ key: APP_SESSION_CACHE_KEY });
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as T | null;
  }

  static setLocal(
    { key, value, immediate = false }:
    {
      key: LocalKeys;
      value: LocalStore[LocalKeys];
      immediate?: boolean;
    },
  ): void {
    localMemory.set({ key, value: toRaw(value) });
    immediate && ls.set({
      key: APP_LOCAL_CACHE_KEY,
      value: localMemory.getCache,
    });
  }

  static removeLocal(
    { key, immediate = false }:
    { key: LocalKeys; immediate?: boolean },
  ): void {
    localMemory.remove(key);
    immediate && ls.set({
      key: APP_LOCAL_CACHE_KEY,
      value: localMemory.getCache,
    });
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as T | null;
  }

  static setSession(
    { key, value, immediate = false }:
    {
      key: SessionKeys;
      value: SessionStore[SessionKeys];
      immediate?: boolean;
    },
  ): void {
    sessionMemory.set({ key, value: toRaw(value) });
    immediate && ss.set({
      key: APP_SESSION_CACHE_KEY,
      value: sessionMemory.getCache,
    });
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && ss.set({
      key: APP_SESSION_CACHE_KEY,
      value: sessionMemory.getCache,
    });
  }

  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

export function initiatePlugin() {
  window.addEventListener('beforeunload', () => {
    // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
    // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改

    /**
     * TOKEN_KEY has been written to storage when logging in or logging out,
     * here is to solve the problem that
     * the token is not synchronized when
     * multiple windows are opened at the same time
     */

    /**
     * LOCK_INFO_KEY is written when
     * the screen is locked and unlocked,
     * and should not be modified here
     */

    ls.set({
      key: APP_LOCAL_CACHE_KEY,
      value: {
        ...omitProps(localMemory.getCache, [LOCK_INFO_KEY]),
        ...pickProps(
          ls.get({ key: APP_LOCAL_CACHE_KEY }),
          [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY],
        ),
      },
    });
    ss.set({
      key: APP_SESSION_CACHE_KEY,
      value: {
        ...omitProps(sessionMemory.getCache, [LOCK_INFO_KEY]),
        ...pickProps(
          ss.get({ key: APP_SESSION_CACHE_KEY }),
          [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
      },
    });
  });

  function storageChange(event: StorageEvent) {
    const { key, newValue, oldValue } = event;

    if (!key) {
      Persistent.clearAll();
      return;
    }

    if (!!newValue && !!oldValue) {
      if (APP_LOCAL_CACHE_KEY === key) {
        Persistent.clearLocal();
      }
      if (APP_SESSION_CACHE_KEY === key) {
        Persistent.clearSession();
      }
    }
  }

  window.addEventListener('storage', storageChange);

  initPersistentMemory();
}
