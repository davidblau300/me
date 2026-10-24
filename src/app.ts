import type { AppDeps, Mounted } from './deps';
import { ROUTE_HASH, routeFromHash, type Route, type ScreenRoute } from './router';
import { mountCalendar } from './screens/calendar';
import { mountPicker } from './screens/picker';
import { mountTasks } from './screens/tasks';

interface PickerHistoryState {
  fromPicker: true;
}

export function startApp(root: HTMLElement, deps: AppDeps): Mounted {
  let current: Mounted | null = null;

  const show = (route: Route): void => {
    current?.stop();
    current = mount(route);
  };

  const mount = (route: Route): Mounted => {
    if (route === 'tasks') return mountTasks(root, deps, goBack);
    if (route === 'calendar') return mountCalendar(root, deps, goBack);
    return mountPicker(root, open);
  };

  const open = (route: ScreenRoute): void => {
    const state: PickerHistoryState = { fromPicker: true };
    history.pushState(state, '', ROUTE_HASH[route]);
    show(route);
  };

  // Pop the entry we pushed so Android's back button and ours agree; a screen opened directly has none to pop.
  const goBack = (): void => {
    if (isPickerState(history.state)) {
      history.back();
      return;
    }
    history.replaceState(null, '', location.pathname + location.search);
    show('picker');
  };

  const onPopState = (): void => show(routeFromHash(location.hash));
  window.addEventListener('popstate', onPopState);
  show(routeFromHash(location.hash));

  return {
    stop() {
      window.removeEventListener('popstate', onPopState);
      current?.stop();
    },
  };
}

function isPickerState(state: unknown): state is PickerHistoryState {
  return typeof state === 'object' && state !== null && (state as Record<string, unknown>).fromPicker === true;
}
