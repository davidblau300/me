import { mountSchedule } from './schedule';
import { SCHEDULE_KEY, saveSchedule } from '../storage/scheduleStore';
import { SCHEDULE_FIXTURE } from '../schedule/fixture';
import { COPY } from '../ui/copy';

let root: HTMLElement;
let screen: { stop(): void };
let onBack: ReturnType<typeof vi.fn<() => void>>;

function start(now: Date): void {
  onBack = vi.fn<() => void>();
  screen = mountSchedule(root, {
    storage: localStorage,
    now: () => now,
    makeId: () => 'id',
    confirm: () => true,
    fetch: vi.fn<typeof fetch>(),
  }, onBack);
}

function subjects(): string[] {
  return [...root.querySelectorAll('.slot .subject')].map((node) => node.textContent ?? '');
}

const TUESDAY_8_20 = new Date(2026, 9, 27, 8, 20);

beforeEach(() => {
  localStorage.clear();
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  screen.stop();
  root.remove();
});

describe('mountSchedule', () => {
  it('shows a friendly message when no timetable is loaded', () => {
    start(TUESDAY_8_20);

    expect(root.querySelector<HTMLElement>('[data-screen]')!.dataset.screen).toBe('schedule');
    expect(root.querySelector('.schedule-empty')?.textContent).toBe(COPY.scheduleEmpty);
  });

  it('opens on today and highlights the current lesson', () => {
    saveSchedule(localStorage, SCHEDULE_FIXTURE);
    start(TUESDAY_8_20);

    expect(root.querySelector('.day-tab.on')?.textContent).toBe('שלישי');
    expect(root.querySelector('.schedule-day-title')?.textContent).toBe('יום שלישי');
    expect(subjects()).toEqual(['משחק', 'אנגלית', 'מתמטיקה', 'מדעים']);
    expect(root.querySelector('.slot.now .subject')?.textContent).toBe('אנגלית');
    expect(root.querySelector('.slot.now .detail')?.textContent).toBe('מורה ב.');
  });

  it('opens on Sunday when it is Saturday', () => {
    saveSchedule(localStorage, SCHEDULE_FIXTURE);
    start(new Date(2026, 9, 24, 10, 0));

    expect(root.querySelector('.day-tab.on')?.textContent).toBe('ראשון');
    expect(root.querySelector('.slot.now')).toBeNull();
  });

  it('tapping a day tab shows that day', () => {
    saveSchedule(localStorage, SCHEDULE_FIXTURE);
    start(TUESDAY_8_20);

    root.querySelector<HTMLButtonElement>('.day-tab[data-day="5"]')!.click();

    expect(root.querySelector('.day-tab.on')?.textContent).toBe('שישי');
    expect(subjects()).toEqual(['יצירה', 'חינוך']);
    expect(root.querySelector('.slot.now')).toBeNull();
  });

  it('shows breaks as ribbons and colors lessons by subject', () => {
    saveSchedule(localStorage, SCHEDULE_FIXTURE);
    start(TUESDAY_8_20);

    expect([...root.querySelectorAll('.ribbon-title')].map((node) => node.textContent)).toEqual(['הפסקה', 'הפסקה קטנה']);
    expect(root.querySelector('.slot.now .lesson')!.classList.contains('tone-english')).toBe(true);
    expect(root.querySelector('.slot .slot-time')?.textContent).toBe('בוקר');
  });

  it('reloads when another window saves a timetable', () => {
    start(TUESDAY_8_20);
    saveSchedule(localStorage, SCHEDULE_FIXTURE);

    window.dispatchEvent(new StorageEvent('storage', { key: SCHEDULE_KEY }));

    expect(subjects()).toHaveLength(4);
  });

  it('back button calls onBack', () => {
    start(TUESDAY_8_20);
    root.querySelector<HTMLButtonElement>('.back')!.click();
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
