import type { CalendarEvent, DayCell, MonthRef } from '../domain/calendar';
import { COPY } from './copy';

const LOCALE = 'he-IL';
const MONTH_FORMAT = new Intl.DateTimeFormat(LOCALE, { month: 'long' });
const DAY_FORMAT = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', day: 'numeric', month: 'long' });
const SUB_SEPARATOR = ' · ';

export const WEEKDAY_LETTERS: readonly string[] = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

export interface MonthState {
  today: string;
  selected: string;
  marked: ReadonlySet<string>;
}

export function monthTitle(ref: MonthRef): string {
  return `${MONTH_FORMAT.format(new Date(ref.year, ref.month, 1))} ${ref.year}`;
}

export function dayTitle(dateKey: string): string {
  return DAY_FORMAT.format(dateFromKey(dateKey));
}

export function dateFromKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function renderMonth(grid: HTMLElement, cells: readonly DayCell[], state: MonthState): void {
  grid.replaceChildren(...cells.map((cell) => renderDay(cell, state)));
}

export function renderDayEvents(container: HTMLElement, events: readonly CalendarEvent[]): void {
  if (events.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = COPY.emptyDay;
    container.replaceChildren(empty);
    return;
  }
  container.replaceChildren(...events.map(renderEvent));
}

function renderDay(cell: DayCell, state: MonthState): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'day';
  button.dataset.date = cell.dateKey;
  button.textContent = String(cell.day);
  button.classList.toggle('out', !cell.inMonth);
  button.classList.toggle('today', cell.dateKey === state.today);
  button.classList.toggle('selected', cell.dateKey === state.selected);
  button.classList.toggle('has-events', state.marked.has(cell.dateKey));
  return button;
}

function renderEvent(event: CalendarEvent): HTMLElement {
  const row = document.createElement('div');
  row.className = 'row event';
  row.dataset.id = event.id;
  const title = document.createElement('div');
  title.className = 'ttl';
  title.textContent = event.title;
  row.append(title);
  const subText = [event.time, event.note].filter(Boolean).join(SUB_SEPARATOR);
  if (subText) {
    const sub = document.createElement('div');
    sub.className = 'sub';
    sub.textContent = subText;
    row.append(sub);
  }
  return row;
}
