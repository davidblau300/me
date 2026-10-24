import { mountCalendar } from './calendar';
import { CALENDAR_KEY, saveEvents } from '../storage/calendarStore';
import { COPY } from '../ui/copy';

let root: HTMLElement;
let screen: { stop(): void };
let onBack: ReturnType<typeof vi.fn<() => void>>;
let confirmAnswer = true;
let idCounter = 0;

function start(): void {
  onBack = vi.fn<() => void>();
  screen = mountCalendar(root, {
    storage: localStorage,
    now: () => new Date(2026, 9, 24, 9, 0),
    makeId: () => `e-${++idCounter}`,
    confirm: () => confirmAnswer,
  }, onBack);
}

function text(selector: string): string | undefined {
  return root.querySelector(selector)?.textContent ?? undefined;
}

function day(dateKey: string): HTMLButtonElement {
  return root.querySelector<HTMLButtonElement>(`[data-date="${dateKey}"]`)!;
}

function eventTitles(): string[] {
  return [...root.querySelectorAll('.event .ttl')].map((node) => node.textContent ?? '');
}

function addViaSheet(title: string, time = ''): void {
  root.querySelector<HTMLButtonElement>('.fab')!.click();
  root.querySelector<HTMLInputElement>('[name="title"]')!.value = title;
  root.querySelector<HTMLInputElement>('[name="time"]')!.value = time;
  root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  idCounter = 0;
  confirmAnswer = true;
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  screen.stop();
  root.remove();
  vi.useRealTimers();
});

describe('mountCalendar', () => {
  it('shows the current month with today selected', () => {
    start();

    expect(root.querySelector<HTMLElement>('[data-screen]')!.dataset.screen).toBe('calendar');
    expect(text('.month-title')).toBe('אוקטובר 2026');
    expect(day('2026-10-24').classList.contains('today')).toBe(true);
    expect(day('2026-10-24').classList.contains('selected')).toBe(true);
    expect(text('.day-title')).toBe('יום שבת, 24 באוקטובר');
    expect([...root.querySelectorAll('.weekdays span')].map((node) => node.textContent)).toEqual(['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']);
  });

  it('adds an event to the selected day and marks the day', () => {
    start();
    day('2026-10-27').click();
    addViaSheet('מבחן בחשבון', '08:00');

    expect(eventTitles()).toEqual(['מבחן בחשבון']);
    expect(text('.event .sub')).toBe('08:00');
    expect(day('2026-10-27').classList.contains('has-events')).toBe(true);
    expect(localStorage.getItem(CALENDAR_KEY)).toContain('2026-10-27');
  });

  it('shows only the selected day events', () => {
    start();
    day('2026-10-27').click();
    addViaSheet('מבחן');
    day('2026-10-28').click();

    expect(eventTitles()).toEqual([]);
    expect(text('.empty')).toBe(COPY.emptyDay);
  });

  it('next and previous month change the title', () => {
    start();
    root.querySelector<HTMLButtonElement>('.next-month')!.click();
    expect(text('.month-title')).toBe('נובמבר 2026');

    root.querySelector<HTMLButtonElement>('.prev-month')!.click();
    root.querySelector<HTMLButtonElement>('.prev-month')!.click();
    expect(text('.month-title')).toBe('ספטמבר 2026');
  });

  it('tapping a day outside the month switches to that month', () => {
    start();
    day('2026-09-27').click();

    expect(text('.month-title')).toBe('ספטמבר 2026');
    expect(day('2026-09-27').classList.contains('selected')).toBe(true);
  });

  it('long press on an event opens it for editing and saves changes', () => {
    start();
    addViaSheet('ים');
    root.querySelector('.event')!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    vi.advanceTimersByTime(500);

    expect(root.querySelector<HTMLInputElement>('[name="title"]')!.value).toBe('ים');
    root.querySelector<HTMLInputElement>('[name="title"]')!.value = 'בריכה';
    root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(eventTitles()).toEqual(['בריכה']);
  });

  it('deletes an event after confirmation and keeps it when cancelled', () => {
    start();
    addViaSheet('ים');
    const openEdit = (): void => {
      root.querySelector('.event')!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      vi.advanceTimersByTime(500);
    };

    confirmAnswer = false;
    openEdit();
    root.querySelector<HTMLButtonElement>('.del')!.click();
    expect(eventTitles()).toEqual(['ים']);

    confirmAnswer = true;
    root.querySelector<HTMLButtonElement>('.del')!.click();
    expect(eventTitles()).toEqual([]);
    expect(day('2026-10-24').classList.contains('has-events')).toBe(false);
  });

  it('uses event wording in the sheet', () => {
    start();
    root.querySelector<HTMLButtonElement>('.fab')!.click();

    expect(text('.sheet h2')).toBe(COPY.sheetNewEvent);
    expect(text('label[for="field-title"]')).toBe(COPY.fieldEventName);
  });

  it('back button calls onBack', () => {
    start();
    root.querySelector<HTMLButtonElement>('.back')!.click();
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('reloads events when another window saves', () => {
    start();
    saveEvents(localStorage, { events: [{ id: 'x', title: 'יום הולדת', date: '2026-10-24', time: '', note: '', createdAt: 1 }] });

    window.dispatchEvent(new StorageEvent('storage', { key: CALENDAR_KEY }));

    expect(eventTitles()).toEqual(['יום הולדת']);
  });
});
