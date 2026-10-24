import { CALENDAR_CORRUPT_PREFIX, CALENDAR_KEY, loadEvents, saveEvents } from './calendarStore';
import type { EventList } from '../domain/calendar';

const NOW_MS = 1_792_830_000_000;
const SAMPLE: EventList = {
  events: [{ id: 'e1', title: 'מבחן', date: '2026-10-27', time: '08:00', note: '', createdAt: 3 }],
};

afterEach(() => localStorage.clear());

describe('calendar store', () => {
  it('returns empty list when nothing stored', () => {
    expect(loadEvents(localStorage, NOW_MS)).toEqual({ list: { events: [] }, canPersist: true });
  });

  it('round-trips saved events', () => {
    expect(saveEvents(localStorage, SAMPLE)).toBe(true);
    expect(loadEvents(localStorage, NOW_MS)).toEqual({ list: SAMPLE, canPersist: true });
  });

  it('keeps corrupt payload under its own key', () => {
    localStorage.setItem(CALENDAR_KEY, '{nope');

    expect(loadEvents(localStorage, NOW_MS).list).toEqual({ events: [] });
    expect(localStorage.getItem(`${CALENDAR_CORRUPT_PREFIX}${NOW_MS}`)).toBe('{nope');
  });

  it('rejects an event with a malformed date', () => {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify({ version: 1, events: [{ ...SAMPLE.events[0], date: '27/10/2026' }] }));
    expect(loadEvents(localStorage, NOW_MS).list).toEqual({ events: [] });
  });

  it('does not touch the task list key', () => {
    localStorage.setItem('me:v1', 'tasks-untouched');
    saveEvents(localStorage, SAMPLE);
    expect(localStorage.getItem('me:v1')).toBe('tasks-untouched');
  });
});
