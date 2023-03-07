import { type RouteLocationNormalized } from 'vue-router';

import { getRawRoute } from './route.utils';

import { mitt } from '~~/app/utils/mitt';

const emitter = mitt();
const key = Symbol('ROUTE_CHANGE');

let lastChangeTab: RouteLocationNormalized;

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const raw = getRawRoute(lastChangeRoute);
  emitter.emit(key, raw);
  lastChangeTab = raw;
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
) {
  emitter.on<any>(key, callback);

  lastChangeTab && callback(lastChangeTab);
}

export function removeTabChangeListener() {
  emitter.all.clear();
}
