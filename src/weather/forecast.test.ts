import { FORECAST_FIXTURE } from './fixture';
import { dayLabel, describeWeather, parseForecast } from './forecast';

const FETCHED_AT = 1_792_840_000_000;

describe('parseForecast', () => {
  it('maps the Open-Meteo response into a report', () => {
    const actual = parseForecast(FORECAST_FIXTURE, FETCHED_AT);

    expect(actual?.fetchedAt).toBe(FETCHED_AT);
    expect(actual?.current).toEqual({ temperature: 28.6, weatherCode: 1, windSpeed: 10.7, isDay: true });
    expect(actual?.daily).toHaveLength(5);
    expect(actual?.daily[3]).toEqual({ date: '2026-10-27', weatherCode: 63, max: 24.9, min: 21.1, rainChance: 70 });
    expect(actual?.daily[2].rainChance).toBeNull();
  });

  it('rejects a response with missing current block', () => {
    expect(parseForecast({ ...FORECAST_FIXTURE, current: undefined }, FETCHED_AT)).toBeNull();
  });

  it('rejects daily arrays of different lengths', () => {
    const broken = { ...FORECAST_FIXTURE, daily: { ...FORECAST_FIXTURE.daily, temperature_2m_min: [1, 2] } };
    expect(parseForecast(broken, FETCHED_AT)).toBeNull();
  });

  it('rejects non-numeric temperatures', () => {
    const broken = { ...FORECAST_FIXTURE, current: { ...FORECAST_FIXTURE.current, temperature_2m: 'hot' } };
    expect(parseForecast(broken, FETCHED_AT)).toBeNull();
  });
});

describe('describeWeather', () => {
  it.each([
    [0, 'בהיר', 'sun'],
    [2, 'מעונן חלקית', 'partly'],
    [3, 'מעונן', 'cloud'],
    [45, 'ערפל', 'fog'],
    [53, 'טפטוף', 'drizzle'],
    [63, 'גשם', 'rain'],
    [81, 'ממטרים', 'rain'],
    [73, 'שלג', 'snow'],
    [95, 'סופת רעמים', 'storm'],
    [999, 'לא ידוע', 'cloud'],
  ])('code %i is %s', (code, label, icon) => {
    expect(describeWeather(code)).toEqual({ label, icon });
  });
});

describe('dayLabel', () => {
  it('names today, tomorrow, then the weekday', () => {
    expect(dayLabel('2026-10-24', '2026-10-24')).toBe('היום');
    expect(dayLabel('2026-10-25', '2026-10-24')).toBe('מחר');
    expect(dayLabel('2026-10-27', '2026-10-24')).toBe('יום שלישי');
  });
});
