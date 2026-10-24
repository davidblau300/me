import { startApp } from './app';
import { SCHEDULE_FIXTURE } from './schedule/fixture';
import { encodeSchedule, type Schedule } from './schedule/schedule';
import { SCHEDULE_KEY, loadSchedule, saveSchedule } from './storage/scheduleStore';
import { savePrefs } from './storage/prefsStore';

let root: HTMLElement;
let app: { stop(): void };
let confirmAnswer = true;

function start(): void {
  app = startApp(root, {
    storage: localStorage,
    now: () => new Date(2026, 9, 24, 9, 0),
    makeId: () => crypto.randomUUID(),
    confirm: () => confirmAnswer,
    fetch: vi.fn<typeof fetch>(),
  });
}

function screenName(): string | undefined {
  return root.querySelector<HTMLElement>('[data-screen]')?.dataset.screen;
}

beforeEach(() => {
  localStorage.clear();
  confirmAnswer = true;
  history.replaceState(null, '', '/');
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  app.stop();
  root.remove();
});

describe('startApp routing', () => {
  it('starts on the picker with tasks and calendar choices', () => {
    start();

    expect(screenName()).toBe('picker');
    expect(root.querySelector('[data-route="tasks"]')).not.toBeNull();
    expect(root.querySelector('[data-route="calendar"]')).not.toBeNull();
    expect(root.querySelector('[data-route="weather"]')).not.toBeNull();
    expect(root.querySelector('[data-route="schedule"]')).not.toBeNull();
    expect(root.querySelector('[data-route="design"]')).not.toBeNull();
  });

  it('opens the design screen from the picker', () => {
    start();
    root.querySelector<HTMLButtonElement>('[data-route="design"]')!.click();

    expect(screenName()).toBe('design');
    expect(location.hash).toBe('#design');
  });

  it('applies saved design choices on start', () => {
    savePrefs(localStorage, { font: 'karantina', palette: 'candy', cast: 'animals' });
    start();

    expect(document.documentElement.dataset.font).toBe('karantina');
    expect(document.documentElement.dataset.palette).toBe('candy');
  });

  it('opens the weather from the picker', () => {
    start();
    root.querySelector<HTMLButtonElement>('[data-route="weather"]')!.click();

    expect(screenName()).toBe('weather');
    expect(location.hash).toBe('#weather');
  });

  it('opens tasks from the picker and back returns to the picker', async () => {
    start();
    root.querySelector<HTMLButtonElement>('[data-route="tasks"]')!.click();
    expect(screenName()).toBe('tasks');
    expect(location.hash).toBe('#tasks');

    root.querySelector<HTMLButtonElement>('.back')!.click();

    await vi.waitFor(() => expect(screenName()).toBe('picker'));
    expect(location.hash).toBe('');
  });

  it('back on a screen opened directly goes to the picker', () => {
    history.replaceState(null, '', '/#tasks');
    start();

    root.querySelector<HTMLButtonElement>('.back')!.click();

    expect(screenName()).toBe('picker');
    expect(location.hash).toBe('');
  });

  it('opens the calendar from the picker', () => {
    start();
    root.querySelector<HTMLButtonElement>('[data-route="calendar"]')!.click();

    expect(screenName()).toBe('calendar');
    expect(location.hash).toBe('#calendar');
  });

  it('opens the screen named in the hash on start', () => {
    history.replaceState(null, '', '/#calendar');
    start();
    expect(screenName()).toBe('calendar');
  });

  it('falls back to the picker for an unknown hash', () => {
    history.replaceState(null, '', '/#nope');
    start();
    expect(screenName()).toBe('picker');
  });

  it('browser back from a screen returns to the picker', () => {
    start();
    root.querySelector<HTMLButtonElement>('[data-route="tasks"]')!.click();

    history.replaceState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));

    expect(screenName()).toBe('picker');
  });

  it('imports a timetable from a link, strips it from the address and opens it', () => {
    history.replaceState(null, '', `/#schedule=${encodeSchedule(SCHEDULE_FIXTURE)}`);
    start();

    expect(screenName()).toBe('schedule');
    expect(location.hash).toBe('#schedule');
    expect(loadSchedule(localStorage, 0).schedule).toEqual(SCHEDULE_FIXTURE);
  });

  it('keeps the existing timetable when replacing is declined', () => {
    const existing: Schedule = { version: 1, slots: [{ kind: 'ribbon', time: '', title: 'ישן' }] };
    saveSchedule(localStorage, existing);
    confirmAnswer = false;
    history.replaceState(null, '', `/#schedule=${encodeSchedule(SCHEDULE_FIXTURE)}`);
    start();

    expect(loadSchedule(localStorage, 0).schedule).toEqual(existing);
    expect(location.hash).toBe('#schedule');
  });

  it('ignores an invalid timetable link and strips it', () => {
    history.replaceState(null, '', '/#schedule=not-a-timetable');
    start();

    expect(screenName()).toBe('schedule');
    expect(location.hash).toBe('#schedule');
    expect(localStorage.getItem(SCHEDULE_KEY)).toBeNull();
  });

  it('uses princess art across screens when princesses are chosen', () => {
    savePrefs(localStorage, { font: 'playpen', palette: 'characters', cast: 'princesses' });
    start();

    expect(document.documentElement.dataset.cast).toBe('princesses');
    expect(root.querySelector('[data-route="tasks"] svg.snow-white')).not.toBeNull();
    expect(root.querySelector('[data-route="calendar"] svg.cinderella')).not.toBeNull();
    expect(root.querySelector('[data-route="weather"] svg.mermaid')).not.toBeNull();
    expect(root.querySelector('[data-route="schedule"] svg.belle')).not.toBeNull();
    expect(root.querySelector('[data-route="design"] svg.aurora')).not.toBeNull();

    root.querySelector<HTMLButtonElement>('[data-route="tasks"]')!.click();
    expect(root.querySelector('[data-filter="done"] svg.snow-white')).not.toBeNull();
    expect(root.querySelector('.brand .crowned')).not.toBeNull();
    expect(root.querySelector('.brand .ears')).toBeNull();
  });

  it('keeps animal art by default', () => {
    start();
    expect(root.querySelector('[data-route="tasks"] svg.snow-white')).toBeNull();
    root.querySelector<HTMLButtonElement>('[data-route="tasks"]')!.click();
    expect(root.querySelector('[data-filter="done"] svg.mouse')).not.toBeNull();
    expect(root.querySelector('.brand .ears')).not.toBeNull();
  });
});
