import { addEvent, addMonths, datesWithEvents, deleteEvent, eventsOn, monthGrid, updateEvent, type CalendarEvent, type EventList } from './calendar';

const EMPTY: EventList = { events: [] };
const NOW = new Date(2026, 9, 24, 9, 0);

function idFactory(): () => string {
  let counter = 0;
  return () => `e-${++counter}`;
}

function event(id: string, date: string, time: string, createdAt: number): CalendarEvent {
  return { id, title: id, date, time, note: '', createdAt };
}

describe('monthGrid', () => {
  it('starts on the Sunday before the 1st and ends on the Saturday after the last day', () => {
    const cells = monthGrid(2026, 9);

    expect(cells).toHaveLength(35);
    expect(cells[0]).toEqual({ dateKey: '2026-09-27', day: 27, inMonth: false });
    expect(cells[4]).toEqual({ dateKey: '2026-10-01', day: 1, inMonth: true });
    expect(cells[34]).toEqual({ dateKey: '2026-10-31', day: 31, inMonth: true });
  });

  it('uses exactly four weeks when the month starts on Sunday and has 28 days', () => {
    const cells = monthGrid(2026, 1);

    expect(cells).toHaveLength(28);
    expect(cells[0].dateKey).toBe('2026-02-01');
    expect(cells[27].dateKey).toBe('2026-02-28');
  });
});

describe('addMonths', () => {
  it('wraps across year boundaries both ways', () => {
    expect(addMonths({ year: 2026, month: 11 }, 1)).toEqual({ year: 2027, month: 0 });
    expect(addMonths({ year: 2026, month: 0 }, -1)).toEqual({ year: 2025, month: 11 });
  });
});

describe('event operations', () => {
  it('addEvent trims fields and stores the date', () => {
    const actual = addEvent(EMPTY, '2026-10-27', { title: '  מבחן  ', time: '08:00', note: ' חשבון ' }, NOW, idFactory());

    expect(actual.events[0]).toEqual({ id: 'e-1', title: 'מבחן', date: '2026-10-27', time: '08:00', note: 'חשבון', createdAt: NOW.getTime() });
  });

  it('addEvent ignores blank title', () => {
    expect(addEvent(EMPTY, '2026-10-27', { title: '  ', time: '', note: '' }, NOW, idFactory())).toBe(EMPTY);
  });

  it('updateEvent keeps date and createdAt', () => {
    const base = addEvent(EMPTY, '2026-10-27', { title: 'a', time: '', note: '' }, NOW, idFactory());

    const actual = updateEvent(base, 'e-1', { title: 'b', time: '10:00', note: 'n' }).events[0];

    expect(actual).toEqual({ ...base.events[0], title: 'b', time: '10:00', note: 'n' });
  });

  it('updateEvent ignores blank title', () => {
    const base = addEvent(EMPTY, '2026-10-27', { title: 'a', time: '', note: '' }, NOW, idFactory());
    expect(updateEvent(base, 'e-1', { title: ' ', time: '', note: '' })).toBe(base);
  });

  it('deleteEvent removes only the given event', () => {
    const list: EventList = { events: [event('a', '2026-10-27', '', 1), event('b', '2026-10-27', '', 2)] };
    expect(deleteEvent(list, 'a').events.map((entry) => entry.id)).toEqual(['b']);
  });
});

describe('eventsOn', () => {
  it('returns only that day, timed ascending then untimed by creation', () => {
    const events = [
      event('untimed-late', '2026-10-27', '', 5),
      event('evening', '2026-10-27', '18:00', 2),
      event('other-day', '2026-10-28', '07:00', 1),
      event('morning', '2026-10-27', '08:00', 3),
      event('untimed-early', '2026-10-27', '', 4),
    ];

    expect(eventsOn(events, '2026-10-27').map((entry) => entry.id)).toEqual(['morning', 'evening', 'untimed-early', 'untimed-late']);
  });
});

describe('datesWithEvents', () => {
  it('collects distinct dates', () => {
    const events = [event('a', '2026-10-27', '', 1), event('b', '2026-10-27', '', 2), event('c', '2026-11-02', '', 3)];
    expect([...datesWithEvents(events)].sort()).toEqual(['2026-10-27', '2026-11-02']);
  });
});
