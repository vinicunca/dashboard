import { type DeepPartial } from 'unocss';
import { defineStore } from 'pinia';
import { mergeDeep } from '@vinicunca/js-utilities';

import { type HeaderSetting, type MenuSetting, type MultiTabsSetting, type ProjectConfig, type TransitionSetting } from './system.type';
import { type THEME_TYPE } from './system.entity';
import { darkMode } from './system.design';

import { type MenuBeforeMiniState } from '~~/app/menu/menu.type';
import { Persistent } from '~~/app/cache/persistent';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '~~/app/cache/cache.entity';

interface ConfigState {
  darkMode?: THEME_TYPE;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  menuBeforeMini: MenuBeforeMiniState;
}

let timeId: TimeoutHandle;

export const useSystemStore = defineStore({
  id: 'app',

  state: (): ConfigState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    menuBeforeMini: {},
  }),

  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },

    getBeforeMiniInfo(): MenuBeforeMiniState {
      return this.menuBeforeMini;
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },

    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },

    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },

  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: THEME_TYPE): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },

    setMenuBeforeMini(state: MenuBeforeMiniState): void {
      this.menuBeforeMini = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = (mergeDeep(this.projectConfig || {}, config) as ProjectConfig);
      Persistent.setLocal({ key: PROJ_CFG_KEY, value: this.projectConfig });
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },

    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});
