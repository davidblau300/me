import { WEATHER_KEY, loadCachedWeather, saveCachedWeather } from './weatherStore';
import { parseForecast, type WeatherReport } from '../weather/forecast';
import { FORECAST_FIXTURE } from '../weather/fixture';

const REPORT = parseForecast(FORECAST_FIXTURE, 1_792_840_000_000) as WeatherReport;

afterEach(() => localStorage.clear());

describe('weather cache', () => {
  it('returns null when nothing cached', () => {
    expect(loadCachedWeather(localStorage)).toBeNull();
  });

  it('round-trips a report', () => {
    expect(saveCachedWeather(localStorage, REPORT)).toBe(true);
    expect(loadCachedWeather(localStorage)).toEqual(REPORT);
  });

  it('ignores an unreadable cache', () => {
    localStorage.setItem(WEATHER_KEY, '{broken');
    expect(loadCachedWeather(localStorage)).toBeNull();
  });

  it('ignores a cache with the wrong shape', () => {
    localStorage.setItem(WEATHER_KEY, JSON.stringify({ version: 1, report: { fetchedAt: 'x' } }));
    expect(loadCachedWeather(localStorage)).toBeNull();
  });

  it('returns false when the write fails', () => {
    const storage = { ...localStorage, setItem: () => { throw new DOMException('full', 'QuotaExceededError'); } } as unknown as Storage;
    expect(saveCachedWeather(storage, REPORT)).toBe(false);
  });
});
