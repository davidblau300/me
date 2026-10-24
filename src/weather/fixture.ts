// Trimmed real Open-Meteo response shape for Tel Aviv, used by tests.
export const FORECAST_FIXTURE = {
  timezone: 'Asia/Jerusalem',
  current: { time: '2026-10-24T14:15', temperature_2m: 28.6, weather_code: 1, wind_speed_10m: 10.7, is_day: 1 },
  daily: {
    time: ['2026-10-24', '2026-10-25', '2026-10-26', '2026-10-27', '2026-10-28'],
    weather_code: [3, 45, 3, 63, 95],
    temperature_2m_max: [29.3, 27.5, 28.2, 24.9, 26.7],
    temperature_2m_min: [20.7, 20.4, 19.0, 21.1, 18.0],
    precipitation_probability_max: [0, 5, null, 70, 85],
  },
};
