import { dateFromKey } from '../domain/day';
import { isRecord } from '../storage/safeStorage';

const MS_PER_DAY = 86_400_000;
const WEEKDAY_FORMAT = new Intl.DateTimeFormat('he-IL', { weekday: 'long' });

export type WeatherIcon = 'sun' | 'partly' | 'cloud' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm';

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  isDay: boolean;
}

export interface DailyWeather {
  date: string;
  weatherCode: number;
  max: number;
  min: number;
  /** Percent, or null when the provider has no estimate. */
  rainChance: number | null;
}

export interface WeatherReport {
  fetchedAt: number;
  current: CurrentWeather;
  daily: DailyWeather[];
}

// WMO weather interpretation codes, as returned by Open-Meteo.
const DESCRIPTIONS: ReadonlyArray<{ codes: readonly number[]; label: string; icon: WeatherIcon }> = [
  { codes: [0], label: 'בהיר', icon: 'sun' },
  { codes: [1, 2], label: 'מעונן חלקית', icon: 'partly' },
  { codes: [3], label: 'מעונן', icon: 'cloud' },
  { codes: [45, 48], label: 'ערפל', icon: 'fog' },
  { codes: [51, 53, 55, 56, 57], label: 'טפטוף', icon: 'drizzle' },
  { codes: [61, 63, 65, 66, 67], label: 'גשם', icon: 'rain' },
  { codes: [80, 81, 82], label: 'ממטרים', icon: 'rain' },
  { codes: [71, 73, 75, 77, 85, 86], label: 'שלג', icon: 'snow' },
  { codes: [95, 96, 99], label: 'סופת רעמים', icon: 'storm' },
];
const UNKNOWN_DESCRIPTION = { label: 'לא ידוע', icon: 'cloud' as WeatherIcon };

export function describeWeather(code: number): { label: string; icon: WeatherIcon } {
  const match = DESCRIPTIONS.find((entry) => entry.codes.includes(code));
  return match ? { label: match.label, icon: match.icon } : UNKNOWN_DESCRIPTION;
}

export function dayLabel(dateKey: string, todayKey: string): string {
  const days = Math.round((dateFromKey(dateKey).getTime() - dateFromKey(todayKey).getTime()) / MS_PER_DAY);
  if (days === 0) return 'היום';
  if (days === 1) return 'מחר';
  return WEEKDAY_FORMAT.format(dateFromKey(dateKey));
}

export function parseForecast(json: unknown, fetchedAt: number): WeatherReport | null {
  if (!isRecord(json) || !isRecord(json.current) || !isRecord(json.daily)) return null;
  const { current, daily } = json;

  if (!isNumber(current.temperature_2m) || !isNumber(current.weather_code) || !isNumber(current.wind_speed_10m)) return null;

  const dates = daily.time;
  const codes = daily.weather_code;
  const maxima = daily.temperature_2m_max;
  const minima = daily.temperature_2m_min;
  const rain = daily.precipitation_probability_max;
  if (!isArrayOf(dates, isString) || !isArrayOf(codes, isNumber) || !isArrayOf(maxima, isNumber) || !isArrayOf(minima, isNumber)) return null;
  if (!isArrayOf(rain, isNumberOrNull)) return null;
  const length = dates.length;
  if ([codes, maxima, minima, rain].some((series) => series.length !== length)) return null;

  return {
    fetchedAt,
    current: {
      temperature: current.temperature_2m,
      weatherCode: current.weather_code,
      windSpeed: current.wind_speed_10m,
      isDay: current.is_day === 1,
    },
    daily: dates.map((date, index) => ({ date, weatherCode: codes[index], max: maxima[index], min: minima[index], rainChance: rain[index] })),
  };
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isNumberOrNull(value: unknown): value is number | null {
  return value === null || isNumber(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}
