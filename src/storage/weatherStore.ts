import type { DailyWeather, WeatherReport } from '../weather/forecast';
import { isRecord, writeBestEffort } from './safeStorage';

export const WEATHER_KEY = 'me:weather:v1';
const WEATHER_SCHEMA_VERSION = 1;

// A cache: unreadable data is simply refetched, so no corrupt-copy backup is needed here.
export function loadCachedWeather(storage: Storage): WeatherReport | null {
  try {
    const raw = storage.getItem(WEATHER_KEY);
    if (raw === null) return null;
    const stored: unknown = JSON.parse(raw);
    if (!isRecord(stored) || stored.version !== WEATHER_SCHEMA_VERSION) return null;
    return isWeatherReport(stored.report) ? stored.report : null;
  } catch {
    return null;
  }
}

export function saveCachedWeather(storage: Storage, report: WeatherReport): boolean {
  return writeBestEffort(storage, WEATHER_KEY, JSON.stringify({ version: WEATHER_SCHEMA_VERSION, report }));
}

function isWeatherReport(value: unknown): value is WeatherReport {
  if (!isRecord(value) || typeof value.fetchedAt !== 'number' || !isRecord(value.current) || !Array.isArray(value.daily)) return false;
  const { current } = value;
  return typeof current.temperature === 'number'
    && typeof current.weatherCode === 'number'
    && typeof current.windSpeed === 'number'
    && typeof current.isDay === 'boolean'
    && value.daily.every(isDailyWeather);
}

function isDailyWeather(value: unknown): value is DailyWeather {
  if (!isRecord(value)) return false;
  return typeof value.date === 'string'
    && typeof value.weatherCode === 'number'
    && typeof value.max === 'number'
    && typeof value.min === 'number'
    && (value.rainChance === null || typeof value.rainChance === 'number');
}
