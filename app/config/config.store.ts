import { type MenuBeforeMiniState } from '../menu/menu.type';
import { type ProjectConfig } from './config.type';
import { type THEME_TYPE } from './config.entity';

interface ConfigState {
  darkMode?: THEME_TYPE;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: MenuBeforeMiniState;
}
