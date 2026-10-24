import { startApp } from './app';

let root: HTMLElement;
let app: { stop(): void };

function start(): void {
  app = startApp(root, {
    storage: localStorage,
    now: () => new Date(2026, 9, 24, 9, 0),
    makeId: () => crypto.randomUUID(),
    confirm: () => true,
  });
}

function screenName(): string | undefined {
  return root.querySelector<HTMLElement>('[data-screen]')?.dataset.screen;
}

beforeEach(() => {
  localStorage.clear();
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
});
