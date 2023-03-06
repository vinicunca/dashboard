import { type MENU_MODE, type MENU_TYPE } from './menu.entity';

export interface MenuBeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MENU_MODE;
  menuType?: MENU_TYPE;
}
