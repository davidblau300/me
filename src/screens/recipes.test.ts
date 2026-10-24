import { mountRecipes } from './recipes';
import { COPY } from '../ui/copy';

let root: HTMLElement;
let screen: { stop(): void };
let onBack: ReturnType<typeof vi.fn<() => void>>;

function start(): void {
  onBack = vi.fn<() => void>();
  screen = mountRecipes(root, {
    storage: localStorage,
    now: () => new Date(2026, 9, 24, 9, 0),
    makeId: () => 'id',
    confirm: () => true,
    fetch: vi.fn<typeof fetch>(),
  }, onBack);
}

function text(selector: string): string | undefined {
  return root.querySelector(selector)?.textContent ?? undefined;
}

beforeEach(() => {
  localStorage.clear();
  history.replaceState(null, '', '/#recipes');
  root = document.createElement('div');
  document.body.append(root);
});

afterEach(() => {
  screen.stop();
  root.remove();
});

describe('mountRecipes', () => {
  it('lists the five recipes', () => {
    start();

    expect(root.querySelector<HTMLElement>('[data-screen]')!.dataset.screen).toBe('recipes');
    expect([...root.querySelectorAll('.recipe-card .recipe-title')].map((node) => node.textContent))
      .toEqual(['עוגיות שוקולד צ׳יפס', 'עוגת וניל', 'פיצה', 'קאפקייקס', 'כדורי שוקולד']);
  });

  it('opens a recipe with its ingredients and steps', () => {
    start();
    root.querySelector<HTMLButtonElement>('.recipe-card[data-recipe="pizza"]')!.click();

    expect(text('.recipe-detail-title')).toBe('פיצה');
    expect(root.querySelectorAll('.ingredient').length).toBeGreaterThanOrEqual(5);
    expect(root.querySelectorAll('.step').length).toBeGreaterThanOrEqual(5);
    expect(root.querySelector('.step .adult-badge')?.textContent).toBe(COPY.withAdult);
    expect(root.querySelector('.recipe-card')).toBeNull();
  });

  it('ticks an ingredient on tap and unticks on a second tap', () => {
    start();
    root.querySelector<HTMLButtonElement>('.recipe-card[data-recipe="cookies"]')!.click();
    const ingredient = root.querySelector<HTMLButtonElement>('.ingredient')!;

    ingredient.click();
    expect(root.querySelector('.ingredient')!.classList.contains('got')).toBe(true);
    root.querySelector<HTMLButtonElement>('.ingredient')!.click();
    expect(root.querySelector('.ingredient')!.classList.contains('got')).toBe(false);
  });

  it('back from a recipe returns to the list', async () => {
    start();
    root.querySelector<HTMLButtonElement>('.recipe-card[data-recipe="cupcakes"]')!.click();

    root.querySelector<HTMLButtonElement>('.back')!.click();

    await vi.waitFor(() => expect(root.querySelectorAll('.recipe-card')).toHaveLength(5));
    expect(onBack).not.toHaveBeenCalled();
  });

  it('back from the list calls onBack', () => {
    start();
    root.querySelector<HTMLButtonElement>('.back')!.click();
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
