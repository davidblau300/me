import { localDateKey } from './day';
import { compareBySchedule } from './schedule';
import type { TaskDraft } from './task';

const DAYS_PER_WEEK = 7;

export interface CalendarEvent {
  readonly id: string;
  title: string;
  /** Local date key "YYYY-MM-DD". */
  readonly date: string;
  time: string;
  note: string;
  readonly createdAt: number;
}

export interface EventList {
  readonly events: readonly CalendarEvent[];
}

export interface MonthRef {
  readonly year: number;
  /** 0-based, as in Date. */
  readonly month: number;
}

export interface DayCell {
  readonly dateKey: string;
  readonly day: number;
  readonly inMonth: boolean;
}

/** Whole weeks Sunday→Saturday covering the month (Israeli week). */
export function monthGrid(year: number, month: number): DayCell[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const start = new Date(year, month, 1 - first.getDay());
  const cellCount = first.getDay() + last.getDate() + (DAYS_PER_WEEK - 1 - last.getDay());

  return Array.from({ length: cellCount }, (_, offset) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset);
    return { dateKey: localDateKey(date), day: date.getDate(), inMonth: date.getMonth() === month };
  });
}

export function addMonths(ref: MonthRef, delta: number): MonthRef {
  const date = new Date(ref.year, ref.month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function addEvent(list: EventList, date: string, draft: TaskDraft, now: Date, makeId: () => string): EventList {
  const title = draft.title.trim();
  if (!title) return list;

  const event: CalendarEvent = { id: makeId(), title, date, time: draft.time, note: draft.note.trim(), createdAt: now.getTime() };
  return { events: [...list.events, event] };
}

export function updateEvent(list: EventList, id: string, draft: TaskDraft): EventList {
  const title = draft.title.trim();
  if (!title) return list;

  return {
    events: list.events.map((event) => (event.id === id ? { ...event, title, time: draft.time, note: draft.note.trim() } : event)),
  };
}

export function deleteEvent(list: EventList, id: string): EventList {
  return { events: list.events.filter((event) => event.id !== id) };
}

export function eventsOn(events: readonly CalendarEvent[], date: string): CalendarEvent[] {
  return events.filter((event) => event.date === date).sort(compareBySchedule);
}

export function datesWithEvents(events: readonly CalendarEvent[]): Set<string> {
  return new Set(events.map((event) => event.date));
}
