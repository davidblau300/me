import type { CalendarEvent, EventList } from '../domain/calendar';
import { isRecord, loadValidated, writeBestEffort } from './safeStorage';

export const CALENDAR_KEY = 'me:calendar:v1';
export const CALENDAR_CORRUPT_PREFIX = 'me:calendar:v1:corrupt:';
const CALENDAR_SCHEMA_VERSION = 1;
const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const EMPTY_EVENTS: EventList = { events: [] };

interface StoredEvents {
  version: typeof CALENDAR_SCHEMA_VERSION;
  events: CalendarEvent[];
}

export function loadEvents(storage: Storage, nowMs: number): { list: EventList; canPersist: boolean } {
  const { value, canPersist } = loadValidated(storage, CALENDAR_KEY, CALENDAR_CORRUPT_PREFIX, nowMs, parseEvents, EMPTY_EVENTS);
  return { list: value, canPersist };
}

export function saveEvents(storage: Storage, list: EventList): boolean {
  const stored: StoredEvents = { version: CALENDAR_SCHEMA_VERSION, events: [...list.events] };
  return writeBestEffort(storage, CALENDAR_KEY, JSON.stringify(stored));
}

function parseEvents(value: unknown): EventList | null {
  if (!isRecord(value) || value.version !== CALENDAR_SCHEMA_VERSION || !Array.isArray(value.events)) return null;
  return value.events.every(isEvent) ? { events: value.events } : null;
}

function isEvent(value: unknown): value is CalendarEvent {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.date === 'string'
    && DATE_KEY_PATTERN.test(value.date)
    && typeof value.time === 'string'
    && typeof value.note === 'string'
    && typeof value.createdAt === 'number';
}
