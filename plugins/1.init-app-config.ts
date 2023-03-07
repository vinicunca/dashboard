import { mergeDeep } from '@vinicunca/js-utilities';

import { type ProjectConfig } from '~~/app/system/system.type';
import { PROJ_CFG_KEY } from '~~/app/cache/cache.entity';
import { Persistent } from '~~/app/cache/persistent';
// import { primaryColor } from '~~/app/system/system.design';
import { projectSetting } from '~~/app/system/system.settings';
import { useSystemStore } from '~~/app/system/system.store';
import { getCommonStoragePrefix, getStorageShortName } from '~~/app/utils/env';

export default defineNuxtPlugin(() => {
  // TODO: implement when i18n is ready
  // const localeStore = useLocaleStore();

  const systemStore = useSystemStore();

  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = (mergeDeep(projectSetting, projCfg || {})) as ProjectConfig;

  // TODO: implement theme change
  // const darkMode = systemStore.getDarkMode;

  // const {
  //   colorWeak,
  //   grayMode,
  //   themeColor,

  //   headerSetting: { bgColor: headerBgColor } = {},
  //   menuSetting: { bgColor } = {},
  // } = projCfg;

  // try {
  //   if (themeColor && themeColor !== primaryColor) {
  //     changeTheme(themeColor);
  //   }

  //   grayMode && updateGrayMode(grayMode);
  //   colorWeak && updateColorWeak(colorWeak);
  // } catch (error) {
  //   console.log(error);
  // }

  systemStore.setProjectConfig(projCfg);

  // TODO: implement theme change
  // init dark mode
  // updateDarkTheme(darkMode);
  // if (darkMode === ThemeEnum.DARK) {
  //   updateHeaderBgColor();
  //   updateSidebarBgColor();
  // } else {
  //   headerBgColor && updateHeaderBgColor(headerBgColor);
  //   bgColor && updateSidebarBgColor(bgColor);
  // }

  // TODO: implement when i18n is ready
  // init store
  // localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
});

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
