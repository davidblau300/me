import { localDateKey } from '../domain/day';
import { dayLabel, describeWeather, type DailyWeather, type WeatherReport } from '../weather/forecast';
import { WEATHER_ICON_SVG } from './art';
import { COPY } from './copy';

export type WeatherStatus = 'idle' | 'loading' | 'failed';

const TIME_FORMAT = new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit' });
const DATE_FORMAT = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'numeric' });

export function renderWeather(container: HTMLElement, report: WeatherReport | null, status: WeatherStatus, now: Date, onRetry: () => void): void {
  const title = element('h2', 'weather-title', COPY.weatherTitle);
  if (report) {
    container.replaceChildren(title, ...renderReport(report, status, now));
    return;
  }
  if (status === 'failed') {
    const box = element('div', 'weather-error');
    const retry = element('button', 'retry', COPY.retry) as HTMLButtonElement;
    retry.type = 'button';
    retry.addEventListener('click', onRetry);
    box.append(element('p', '', COPY.weatherError), retry);
    container.replaceChildren(title, box);
    return;
  }
  container.replaceChildren(title, element('p', 'loading', COPY.weatherLoading));
}

function renderReport(report: WeatherReport, status: WeatherStatus, now: Date): HTMLElement[] {
  const { current } = report;
  const description = describeWeather(current.weatherCode);

  const card = element('section', 'now-card');
  const icon = element('div', 'now-icon');
  icon.innerHTML = WEATHER_ICON_SVG[description.icon];
  const facts = element('div', 'now-facts');
  facts.append(
    element('div', 'now-temp', degrees(current.temperature)),
    element('div', 'now-label', description.label),
    element('div', 'now-wind', `רוח ${Math.round(current.windSpeed)} קמ״ש`),
  );
  card.append(icon, facts);

  const nodes = [card, element('p', 'updated', `עודכן ב-${fetchedLabel(report.fetchedAt, now)}`)];
  if (status === 'failed') nodes.push(element('p', 'notice', COPY.weatherOffline));

  const days = element('ul', 'days');
  const todayKey = localDateKey(now);
  days.append(...report.daily.map((day) => renderDay(day, todayKey)));
  nodes.push(days);
  return nodes;
}

function renderDay(day: DailyWeather, todayKey: string): HTMLElement {
  const description = describeWeather(day.weatherCode);
  const row = element('li', 'day-row');
  const icon = element('span', 'day-icon');
  icon.innerHTML = WEATHER_ICON_SVG[description.icon];
  const info = element('span', 'day-info');
  info.append(element('span', 'day-name', dayLabel(day.date, todayKey)), element('span', 'day-label', description.label));
  row.append(icon, info, element('span', 'day-temps', `${degrees(day.max)} / ${degrees(day.min)}`));
  if (day.rainChance !== null) row.append(element('span', 'day-rain', `גשם ${day.rainChance}%`));
  return row;
}

function fetchedLabel(fetchedAt: number, now: Date): string {
  const fetched = new Date(fetchedAt);
  const time = TIME_FORMAT.format(fetched);
  return localDateKey(fetched) === localDateKey(now) ? time : `${DATE_FORMAT.format(fetched)} ${time}`;
}

function degrees(value: number): string {
  return `${Math.round(value)}°`;
}

function element(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
