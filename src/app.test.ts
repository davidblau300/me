import { DAY_CHECK_MS, startApp } from './app';
import { STORAGE_KEY, saveState } from './storage/store';

let root: HTMLElement;
let current: Date;
let app: { stop(): void };
let idCounter = 0;

function start(): void {
  app = startApp(root, {
    storage: localStorage,
    now: () => current,
    makeId: () => `id-${++idCounter}`,
    confirm: () => true,
  });
}

function addViaSheet(title: string): void {
  root.querySelector<HTMLButtonElement>('.fab')!.click();
  root.querySelector<HTMLInputElement>('[name="title"]')!.value = title;
  root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

function rows(): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('.row')];
}

function tap(row: HTMLElement): void {
  row.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  idCounter = 0;
  current = new Date(2026, 9, 24, 9, 0);
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  app.stop();
  root.remove();
  vi.useRealTimers();
});

describe('startApp', () => {
  it('adds a task through the sheet and persists it', () => {
    start();
    addViaSheet('לקרוא');

    expect(rows().map((row) => row.querySelector('.ttl')!.textContent)).toEqual(['לקרוא']);
    expect(localStorage.getItem(STORAGE_KEY)).toContain('לקרוא');
  });

  it('tap ticks and second tap unticks', () => {
    start();
    addViaSheet('לקרוא');

    tap(rows()[0]);
    expect(rows()[0].classList.contains('done')).toBe(true);
    tap(rows()[0]);
    expect(rows()[0].classList.contains('done')).toBe(false);
  });

  it('done tab shows only ticked tasks', () => {
    start();
    addViaSheet('א');
    addViaSheet('ב');
    tap(rows()[0]);

    root.querySelector<HTMLButtonElement>('[data-filter="done"]')!.click();

    expect(rows().map((row) => row.querySelector('.ttl')!.textContent)).toEqual(['א']);
    expect(root.querySelector('[data-filter="done"]')!.classList.contains('on')).toBe(true);
  });

  it('rerenders when the local date changes', () => {
    current = new Date(2026, 9, 24, 23, 58);
    start();
    addViaSheet('לצחצח שיניים');
    tap(rows()[0]);
    expect(rows()[0].classList.contains('done')).toBe(true);

    current = new Date(2026, 9, 25, 0, 1);
    vi.advanceTimersByTime(DAY_CHECK_MS);

    expect(rows()[0].classList.contains('done')).toBe(false);
  });

  it('rerenders on return to the foreground after midnight', () => {
    current = new Date(2026, 9, 24, 23, 58);
    start();
    addViaSheet('לקרוא');
    tap(rows()[0]);

    current = new Date(2026, 9, 25, 7, 0);
    document.dispatchEvent(new Event('visibilitychange'));

    expect(rows()[0].classList.contains('done')).toBe(false);
  });

  it('loads existing tasks on start', () => {
    saveState(localStorage, {
      tasks: [{ id: 'x', title: 'חוג', time: '16:00', note: '', tone: 'red', doneOn: '2026-10-24', createdAt: 1 }],
      nextTone: 2,
    });
    start();

    expect(rows()).toHaveLength(1);
    expect(rows()[0].classList.contains('done')).toBe(true);
  });

  it('long press opens the sheet prefilled for editing', () => {
    start();
    addViaSheet('לקרוא');
    const row = rows()[0];
    row.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    vi.advanceTimersByTime(500);

    expect(root.querySelector<HTMLInputElement>('[name="title"]')!.value).toBe('לקרוא');
    expect(root.querySelector('.sheet')!.classList.contains('open')).toBe(true);
  });
});
