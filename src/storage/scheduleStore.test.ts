import { SCHEDULE_CORRUPT_PREFIX, SCHEDULE_KEY, loadSchedule, saveSchedule } from './scheduleStore';
import { SCHEDULE_FIXTURE } from '../schedule/fixture';

const NOW_MS = 1_792_840_000_000;

afterEach(() => localStorage.clear());

describe('schedule store', () => {
  it('returns null schedule when nothing stored', () => {
    expect(loadSchedule(localStorage, NOW_MS)).toEqual({ schedule: null, canPersist: true });
  });

  it('round-trips a schedule', () => {
    expect(saveSchedule(localStorage, SCHEDULE_FIXTURE)).toBe(true);
    expect(loadSchedule(localStorage, NOW_MS)).toEqual({ schedule: SCHEDULE_FIXTURE, canPersist: true });
  });

  it('keeps an unreadable schedule under its own key', () => {
    localStorage.setItem(SCHEDULE_KEY, '{bad');
    expect(loadSchedule(localStorage, NOW_MS).schedule).toBeNull();
    expect(localStorage.getItem(`${SCHEDULE_CORRUPT_PREFIX}${NOW_MS}`)).toBe('{bad');
  });
});
