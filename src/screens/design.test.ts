import { mountDesign } from './design';
import { PREFS_KEY, loadPrefs } from '../storage/prefsStore';

let root: HTMLElement;
let screen: { stop(): void };
let onBack: ReturnType<typeof vi.fn<() => void>>;

function start(): void {
  onBack = vi.fn<() => void>();
  screen = mountDesign(root, {
    storage: localStorage,
    now: () => new Date(2026, 9, 24, 9, 0),
    makeId: () => 'id',
    confirm: () => true,
    fetch: vi.fn<typeof fetch>(),
  }, onBack);
}

function selected(selector: string): string[] {
  return [...root.querySelectorAll<HTMLElement>(`${selector}.on`)].map((node) => node.dataset.font ?? node.dataset.palette ?? '');
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-font');
  document.documentElement.removeAttribute('data-palette');
  document.documentElement.removeAttribute('style');
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  screen.stop();
  root.remove();
});

describe('mountDesign', () => {
  it('lists fonts and palettes with the current choice selected', () => {
    start();

    expect(root.querySelector<HTMLElement>('[data-screen]')!.dataset.screen).toBe('design');
    expect(root.querySelectorAll('.font-option')).toHaveLength(6);
    expect(root.querySelectorAll('.palette-option')).toHaveLength(5);
    expect(selected('.font-option')).toEqual(['playpen']);
    expect(selected('.palette-option')).toEqual(['characters']);
  });

  it('applies and saves a font choice', () => {
    start();
    root.querySelector<HTMLButtonElement>('.font-option[data-font="amatic"]')!.click();

    expect(document.documentElement.dataset.font).toBe('amatic');
    expect(loadPrefs(localStorage).font).toBe('amatic');
    expect(selected('.font-option')).toEqual(['amatic']);
    expect(root.querySelector('.font-option[data-font="amatic"]')!.getAttribute('aria-pressed')).toBe('true');
  });

  it('applies and saves a palette choice', () => {
    start();
    root.querySelector<HTMLButtonElement>('.palette-option[data-palette="ocean"]')!.click();

    expect(document.documentElement.dataset.palette).toBe('ocean');
    expect(loadPrefs(localStorage).palette).toBe('ocean');
    expect(selected('.palette-option')).toEqual(['ocean']);
  });

  it('reset returns to the defaults', () => {
    start();
    root.querySelector<HTMLButtonElement>('.font-option[data-font="suez"]')!.click();
    root.querySelector<HTMLButtonElement>('.palette-option[data-palette="forest"]')!.click();

    root.querySelector<HTMLButtonElement>('.reset')!.click();

    expect(loadPrefs(localStorage)).toEqual({ font: 'playpen', palette: 'characters' });
    expect(document.documentElement.dataset.palette).toBe('characters');
    expect(localStorage.getItem(PREFS_KEY)).not.toBeNull();
  });

  it('back button calls onBack', () => {
    start();
    root.querySelector<HTMLButtonElement>('.back')!.click();
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
