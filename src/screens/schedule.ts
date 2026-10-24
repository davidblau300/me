import type { AppDeps, Mounted } from '../deps';
import { schoolDayIndex, type Schedule } from '../schedule/schedule';
import { SCHEDULE_KEY, loadSchedule } from '../storage/scheduleStore';
import { CAST_ART, type CastArt } from '../ui/castArt';
import { loadPrefs } from '../storage/prefsStore';
import { backButton } from '../ui/back';
import { renderSchedule } from '../ui/scheduleView';

const NOW_CHECK_MS = 60_000;

export function mountSchedule(root: HTMLElement, deps: AppDeps, onBack: () => void): Mounted {
  let schedule: Schedule | null = loadSchedule(deps.storage, deps.now().getTime()).schedule;
  let dayIndex = schoolDayIndex(deps.now());

  const shell = buildShell(onBack, CAST_ART[loadPrefs(deps.storage).cast]);
  root.replaceChildren(shell.app);

  const render = (): void => {
    const now = deps.now();
    renderSchedule(shell.body, schedule, dayIndex, { dayIndex: schoolDayIndex(now), now });
  };

  shell.body.addEventListener('click', (event) => {
    const tab = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-day]') : null;
    if (!tab?.dataset.day) return;
    dayIndex = Number(tab.dataset.day);
    render();
  });

  const onStorage = (event: StorageEvent): void => {
    if (event.key !== SCHEDULE_KEY && event.key !== null) return;
    schedule = loadSchedule(deps.storage, deps.now().getTime()).schedule;
    render();
  };
  // Keep the "now" highlight moving through the school day.
  const nowTimer = setInterval(render, NOW_CHECK_MS);
  window.addEventListener('storage', onStorage);

  render();

  return {
    stop() {
      clearInterval(nowTimer);
      window.removeEventListener('storage', onStorage);
    },
  };
}

function buildShell(onBack: () => void, art: CastArt): { app: HTMLElement; body: HTMLElement } {
  const app = document.createElement('div');
  app.className = 'app minnie-theme';
  app.dataset.screen = 'schedule';

  const head = document.createElement('header');
  head.className = 'head schedule-head';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'me';
  const mascot = document.createElement('span');
  mascot.className = 'mascot';
  mascot.innerHTML = art.scheduleMascot;
  head.append(backButton(onBack), logo, mascot);

  const body = document.createElement('main');
  body.className = 'feed schedule-body';

  app.append(head, body);
  return { app, body };
}
