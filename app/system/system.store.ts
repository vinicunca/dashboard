import { defineStore } from 'pinia';

import { type MenuBeforeMiniState } from '../menu/menu.type';
import { type ProjectConfig } from './system.type';
import { type THEME_TYPE } from './system.entity';

import { PROJ_CFG_KEY } from '~~/app/cache/cache.entity';

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

export const useAppStore = defineStore({
  id: 'app',
  state: (): ConfigState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    menuBeforeMini: {},
  }),
});
