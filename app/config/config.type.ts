import { type CONTENT_TYPE, type PERMISSION_MODE, type ROUTER_TRANSITION, type SESSION_TIMEOUT_PROCESSING, type SETTING_BUTTON_POSITION, type THEME_TYPE } from './config.entity';

import { type MENU_MODE, type MENU_TYPE, type MIX_SIDEBAR_TRIGGER, type TRIGGER_TYPE } from '~~/app/menu/menu.entity';
import { type CACHE_TYPE } from '~~/app/cache/cache.entity';

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CACHE_TYPE;
  // Whether to show the configuration button
  showSettingButton: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  settingButtonPosition: SETTING_BUTTON_POSITION;
  // Permission mode
  permissionMode: PERMISSION_MODE;
  // Session timeout processing
  sessionTimeoutProcessing: SESSION_TIMEOUT_PROCESSING;
  // Website gray mode, open for possible mourning dates
  grayMode: boolean;
  // Whether to turn on the color weak mode
  colorWeak: boolean;
  // Theme color
  themeColor: string;

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean;
  // content width
  contentMode: CONTENT_TYPE;
  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  showFooter: boolean;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Lock screen time
  lockTime: number;
  // Show breadcrumbs
  showBreadCrumb: boolean;
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: THEME_TYPE;
  // Turn on full screen
  showFullScreen: boolean;
  // Whether to show the lock screen
  useLockPage: boolean;
  // Show document button
  showDoc: boolean;
  // Show message center button
  showNotice: boolean;
  showSearch: boolean;
}

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  sidebarHidden: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MENU_MODE;
  type: MENU_TYPE;
  theme: THEME_TYPE;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TRIGGER_TYPE;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MIX_SIDEBAR_TRIGGER;
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: ROUTER_TRANSITION;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}
