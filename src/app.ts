import type { AppDeps, Mounted } from './deps';
import { ROUTE_HASH, routeFromHash, type Route, type ScreenRoute } from './router';
import { decodeSchedule } from './schedule/schedule';
import { loadSchedule, saveSchedule } from './storage/scheduleStore';
import { COPY } from './ui/copy';
import { mountCalendar } from './screens/calendar';
import { mountPicker } from './screens/picker';
import { mountSchedule } from './screens/schedule';
import { mountDesign } from './screens/design';
import { applyPrefs } from './prefs/prefs';
import { PREFS_KEY, loadPrefs } from './storage/prefsStore';
import { CAST_ART } from './ui/castArt';
import { mountTasks } from './screens/tasks';
import { mountWeather } from './screens/weather';

// A private link "…/me/#schedule=<payload>" carries her timetable; fragments never reach any server.
const SCHEDULE_IMPORT_PREFIX = '#schedule=';

interface PickerHistoryState {
  fromPicker: true;
}

export function startApp(root: HTMLElement, deps: AppDeps): Mounted {
  importScheduleFromLink(deps);
  applyPrefs(document.documentElement, loadPrefs(deps.storage));
  let current: Mounted | null = null;

  const show = (route: Route): void => {
    current?.stop();
    current = mount(route);
  };

  const mount = (route: Route): Mounted => {
    if (route === 'tasks') return mountTasks(root, deps, goBack);
    if (route === 'calendar') return mountCalendar(root, deps, goBack);
    if (route === 'weather') return mountWeather(root, deps, goBack);
    if (route === 'schedule') return mountSchedule(root, deps, goBack);
    if (route === 'design') return mountDesign(root, deps, goBack);
    return mountPicker(root, open, CAST_ART[loadPrefs(deps.storage).cast]);
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
  // Design chosen in another window (browser tab vs installed app) applies here too.
  const onStorage = (event: StorageEvent): void => {
    if (event.key === PREFS_KEY || event.key === null) applyPrefs(document.documentElement, loadPrefs(deps.storage));
  };
  window.addEventListener('popstate', onPopState);
  window.addEventListener('storage', onStorage);
  show(routeFromHash(location.hash));

  return {
    stop() {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('storage', onStorage);
      current?.stop();
    },
  };
}

function importScheduleFromLink(deps: AppDeps): void {
  if (!location.hash.startsWith(SCHEDULE_IMPORT_PREFIX)) return;
  const incoming = decodeSchedule(location.hash.slice(SCHEDULE_IMPORT_PREFIX.length));
  // Drop the payload from the address bar and session history whether or not it was valid.
  history.replaceState(null, '', location.pathname + location.search + ROUTE_HASH.schedule);
  if (!incoming) return;

  const existing = loadSchedule(deps.storage, deps.now().getTime()).schedule;
  const differs = existing !== null && JSON.stringify(existing) !== JSON.stringify(incoming);
  if (differs && !deps.confirm(COPY.scheduleReplace)) return;
  saveSchedule(deps.storage, incoming);
}

function isPickerState(state: unknown): state is PickerHistoryState {
  return typeof state === 'object' && state !== null && (state as Record<string, unknown>).fromPicker === true;
}
