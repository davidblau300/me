import type { AppDeps, Mounted } from '../deps';
import { loadCachedWeather, saveCachedWeather } from '../storage/weatherStore';
import { CAST_ART, type CastArt } from '../ui/castArt';
import { loadPrefs } from '../storage/prefsStore';
import { backButton } from '../ui/back';
import { renderWeather, type WeatherStatus } from '../ui/weatherView';
import { WeatherUnavailableError, fetchForecast } from '../weather/client';
import type { WeatherReport } from '../weather/forecast';

const STALE_AFTER_MS = 15 * 60_000;

export function mountWeather(root: HTMLElement, deps: AppDeps, onBack: () => void): Mounted {
  let report: WeatherReport | null = loadCachedWeather(deps.storage);
  let status: WeatherStatus = 'idle';
  let inFlight: AbortController | null = null;
  let stopped = false;

  const shell = buildShell(onBack, CAST_ART[loadPrefs(deps.storage).cast]);
  root.replaceChildren(shell.app);

  const render = (): void => renderWeather(shell.body, report, status, deps.now(), () => void refresh());
  const isStale = (): boolean => report === null || deps.now().getTime() - report.fetchedAt > STALE_AFTER_MS;

  const refresh = async (): Promise<void> => {
    if (inFlight) return;
    const controller = new AbortController();
    inFlight = controller;
    status = 'loading';
    render();
    try {
      report = await fetchForecast(deps.fetch, deps.now().getTime(), controller.signal);
      saveCachedWeather(deps.storage, report);
      status = 'idle';
    } catch (error) {
      if (!(error instanceof WeatherUnavailableError)) throw error;
      status = 'failed';
    } finally {
      inFlight = null;
    }
    if (!stopped) render();
  };

  const onVisibility = (): void => {
    if (document.visibilityState === 'visible' && isStale()) void refresh();
  };
  document.addEventListener('visibilitychange', onVisibility);

  render();
  if (isStale()) void refresh();

  return {
    stop() {
      stopped = true;
      inFlight?.abort();
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}

function buildShell(onBack: () => void, art: CastArt): { app: HTMLElement; body: HTMLElement } {
  const app = document.createElement('div');
  app.className = 'app goofy-theme';
  app.dataset.screen = 'weather';

  const head = document.createElement('header');
  head.className = 'head weather-head';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'me';
  const mascot = document.createElement('span');
  mascot.className = 'mascot';
  mascot.innerHTML = art.weatherMascot;
  head.append(backButton(onBack), logo, mascot);

  const body = document.createElement('main');
  body.className = 'feed weather-body';

  app.append(head, body);
  return { app, body };
}
