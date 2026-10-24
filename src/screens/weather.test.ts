import { mountWeather } from './weather';
import { WEATHER_KEY, saveCachedWeather } from '../storage/weatherStore';
import { FORECAST_FIXTURE } from '../weather/fixture';
import { parseForecast, type WeatherReport } from '../weather/forecast';
import { COPY } from '../ui/copy';

const NOW = new Date(2026, 9, 24, 14, 20);
const MINUTE_MS = 60_000;

let root: HTMLElement;
let screen: { stop(): void };
let onBack: ReturnType<typeof vi.fn<() => void>>;
let fetchStub: ReturnType<typeof vi.fn<typeof fetch>>;

function okResponse(): Response {
  return new Response(JSON.stringify(FORECAST_FIXTURE), { status: 200 });
}

function cachedAt(ageMs: number): void {
  saveCachedWeather(localStorage, parseForecast(FORECAST_FIXTURE, NOW.getTime() - ageMs) as WeatherReport);
}

function start(): void {
  onBack = vi.fn<() => void>();
  screen = mountWeather(root, {
    storage: localStorage,
    now: () => NOW,
    makeId: () => 'id',
    confirm: () => true,
    fetch: fetchStub,
  }, onBack);
}

function text(selector: string): string | undefined {
  return root.querySelector(selector)?.textContent ?? undefined;
}

beforeEach(() => {
  localStorage.clear();
  fetchStub = vi.fn<typeof fetch>(async () => okResponse());
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  screen.stop();
  root.remove();
});

describe('mountWeather', () => {
  it('fetches and shows current weather and five days', async () => {
    start();

    await vi.waitFor(() => expect(text('.now-temp')).toBe('29°'));
    expect(root.querySelector<HTMLElement>('[data-screen]')!.dataset.screen).toBe('weather');
    expect(text('.now-label')).toBe('מעונן חלקית');
    expect(text('.now-wind')).toBe('רוח 11 קמ״ש');
    expect(text('.updated')).toBe('עודכן ב-14:20');
    const rows = [...root.querySelectorAll('.day-row')];
    expect(rows).toHaveLength(5);
    expect(rows.map((row) => row.querySelector('.day-name')!.textContent)).toEqual(['היום', 'מחר', 'יום שני', 'יום שלישי', 'יום רביעי']);
    expect(rows[3].querySelector('.day-temps')!.textContent).toBe('25° / 21°');
    expect(rows[3].querySelector('.day-rain')!.textContent).toBe('גשם 70%');
    expect(rows[2].querySelector('.day-rain')).toBeNull();
    expect(localStorage.getItem(WEATHER_KEY)).not.toBeNull();
    expect(fetchStub).toHaveBeenCalledTimes(1);
  });

  it('shows a fresh cache without fetching', () => {
    cachedAt(5 * MINUTE_MS);
    start();

    expect(text('.now-temp')).toBe('29°');
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it('shows a stale cache at once and refreshes it', async () => {
    cachedAt(60 * MINUTE_MS);
    start();

    expect(text('.now-temp')).toBe('29°');
    expect(text('.updated')).toBe('עודכן ב-13:20');
    await vi.waitFor(() => expect(text('.updated')).toBe('עודכן ב-14:20'));
    expect(fetchStub).toHaveBeenCalledTimes(1);
  });

  it('keeps cached data and shows offline notice when refresh fails', async () => {
    cachedAt(60 * MINUTE_MS);
    fetchStub = vi.fn<typeof fetch>(async () => { throw new TypeError('Failed to fetch'); });
    start();

    await vi.waitFor(() => expect(text('.notice')).toBe(COPY.weatherOffline));
    expect(text('.now-temp')).toBe('29°');
  });

  it('shows error with retry when nothing is cached and the fetch fails', async () => {
    fetchStub = vi.fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(okResponse());
    start();

    await vi.waitFor(() => expect(text('.weather-error p')).toBe(COPY.weatherError));
    root.querySelector<HTMLButtonElement>('.retry')!.click();

    await vi.waitFor(() => expect(text('.now-temp')).toBe('29°'));
    expect(root.querySelector('.weather-error')).toBeNull();
    expect(fetchStub).toHaveBeenCalledTimes(2);
  });

  it('cancels the request when leaving the screen', () => {
    fetchStub = vi.fn<typeof fetch>(() => new Promise<Response>(() => {}));
    start();

    screen.stop();

    expect(fetchStub.mock.calls[0][1]?.signal?.aborted).toBe(true);
  });

  it('back button calls onBack', () => {
    cachedAt(MINUTE_MS);
    start();
    root.querySelector<HTMLButtonElement>('.back')!.click();
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
