import { SCHOOL_DAYS, daySlots, isCurrentSlot, subjectTone, type DayRow, type Schedule } from '../schedule/schedule';
import { COPY } from './copy';

const DAY_NAMES: readonly string[] = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
const DETAIL_SEPARATOR = ' · ';

export function renderSchedule(container: HTMLElement, schedule: Schedule | null, dayIndex: number, today: { dayIndex: number; now: Date }): void {
  if (!schedule) {
    container.replaceChildren(element('p', 'schedule-empty', COPY.scheduleEmpty));
    return;
  }
  const tabs = element('nav', 'day-tabs');
  for (let index = 0; index < SCHOOL_DAYS; index++) {
    const tab = element('button', 'day-tab', DAY_NAMES[index]) as HTMLButtonElement;
    tab.type = 'button';
    tab.dataset.day = String(index);
    tab.classList.toggle('on', index === dayIndex);
    tabs.append(tab);
  }
  const title = element('h2', 'schedule-day-title', `יום ${DAY_NAMES[dayIndex]}`);
  const isToday = dayIndex === today.dayIndex && today.now.getDay() === dayIndex;
  const rows = daySlots(schedule, dayIndex).map((row) => renderRow(row, isToday && isCurrentSlot(row.time, today.now)));
  container.replaceChildren(tabs, title, ...rows);
}

function renderRow(row: DayRow, isNow: boolean): HTMLElement {
  if (row.kind === 'ribbon') {
    const ribbon = element('div', 'ribbon');
    ribbon.append(element('span', 'ribbon-title', row.title));
    if (row.time) ribbon.append(element('span', 'ribbon-time', row.time));
    return ribbon;
  }
  const slot = element('div', 'slot');
  slot.classList.toggle('now', isNow);
  const [subject, ...details] = row.lines;
  const lesson = element('div', `lesson tone-${subjectTone(subject)}`);
  lesson.append(element('div', 'subject', subject));
  if (details.length > 0) lesson.append(element('div', 'detail', details.join(DETAIL_SEPARATOR)));
  if (isNow) lesson.append(element('span', 'now-badge', COPY.scheduleNow));
  slot.append(element('div', 'slot-time', row.time || row.label), lesson);
  return slot;
}

function element(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
