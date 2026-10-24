import { parseForecast, type WeatherReport } from './forecast';

// Fixed Tel Aviv coordinates: the only thing this request reveals; nothing about her or her tasks is sent.
const TEL_AVIV = { latitude: 32.0853, longitude: 34.7818 } as const;
const FORECAST_DAYS = 5;

export const FETCH_TIMEOUT_MS = 8_000;
export const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({
  latitude: String(TEL_AVIV.latitude),
  longitude: String(TEL_AVIV.longitude),
  current: 'temperature_2m,weather_code,wind_speed_10m,is_day',
  daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
  timezone: 'Asia/Jerusalem',
  forecast_days: String(FORECAST_DAYS),
}).toString();

export class WeatherUnavailableError extends Error {
  constructor(reason: string, options?: { cause?: unknown }) {
    super(`Weather unavailable: ${reason}`, options);
    this.name = 'WeatherUnavailableError';
  }
}

export async function fetchForecast(fetchImpl: typeof fetch, nowMs: number, cancel?: AbortSignal): Promise<WeatherReport> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const onCancel = (): void => controller.abort();
  cancel?.addEventListener('abort', onCancel);

  let body: unknown;
  try {
    const response = await fetchImpl(FORECAST_URL, { signal: controller.signal, credentials: 'omit' });
    if (!response.ok) throw new WeatherUnavailableError(`HTTP ${response.status}`);
    body = await response.json();
  } catch (error) {
    if (error instanceof WeatherUnavailableError) throw error;
    throw new WeatherUnavailableError('network', { cause: error });
  } finally {
    clearTimeout(timer);
    cancel?.removeEventListener('abort', onCancel);
  }

  const report = parseForecast(body, nowMs);
  if (!report) throw new WeatherUnavailableError('unexpected response');
  return report;
}
