import { CORRUPT_KEY_PREFIX, STORAGE_KEY, loadState, resolveStorage, saveState } from './store';
import type { TaskList } from '../domain/task';

const SAMPLE: TaskList = {
  tasks: [{ id: 'a', title: 'לקרוא', time: '', note: '', tone: 'red', doneOn: '2026-10-24', createdAt: 5 }],
  nextTone: 2,
};
const EMPTY = { tasks: [], nextTone: 0 };
const NOW_MS = 1_792_830_000_000;

function stubStorage(overrides: Partial<Storage>): Storage {
  const backing = new Map<string, string>();
  return {
    get length() { return backing.size; },
    clear: () => backing.clear(),
    key: (index: number) => [...backing.keys()][index] ?? null,
    getItem: (key: string) => backing.get(key) ?? null,
    setItem: (key: string, value: string) => { backing.set(key, value); },
    removeItem: (key: string) => { backing.delete(key); },
    ...overrides,
  };
}

afterEach(() => localStorage.clear());

describe('loadState', () => {
  it('returns empty state when nothing stored', () => {
    expect(loadState(localStorage, NOW_MS)).toEqual({ list: EMPTY, canPersist: true });
  });

  it('round-trips saved state', () => {
    expect(saveState(localStorage, SAMPLE)).toBe(true);
    expect(loadState(localStorage, NOW_MS)).toEqual({ list: SAMPLE, canPersist: true });
  });

  it('keeps corrupt payload aside and returns empty state', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');

    expect(loadState(localStorage, NOW_MS)).toEqual({ list: EMPTY, canPersist: true });
    expect(localStorage.getItem(`${CORRUPT_KEY_PREFIX}${NOW_MS}`)).toBe('{not json');
  });

  it('keeps each corrupt payload under its own key', () => {
    localStorage.setItem(STORAGE_KEY, 'first');
    loadState(localStorage, NOW_MS);
    localStorage.setItem(STORAGE_KEY, 'second');
    loadState(localStorage, NOW_MS + 1);

    expect(localStorage.getItem(`${CORRUPT_KEY_PREFIX}${NOW_MS}`)).toBe('first');
    expect(localStorage.getItem(`${CORRUPT_KEY_PREFIX}${NOW_MS + 1}`)).toBe('second');
  });

  it('forbids persisting when the corrupt copy cannot be saved', () => {
    const storage = stubStorage({
      getItem: () => '{not json',
      setItem: () => { throw new DOMException('full', 'QuotaExceededError'); },
    });

    expect(loadState(storage, NOW_MS)).toEqual({ list: EMPTY, canPersist: false });
  });

  it('forbids persisting when reading storage throws', () => {
    const storage = stubStorage({ getItem: () => { throw new DOMException('blocked', 'SecurityError'); } });

    expect(loadState(storage, NOW_MS)).toEqual({ list: EMPTY, canPersist: false });
  });

  it('rejects wrong schema version', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, tasks: [], nextTone: 0 }));
    expect(loadState(localStorage, NOW_MS).list).toEqual(EMPTY);
  });

  it('rejects task without string title', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks: [{ id: 'a', title: 3 }], nextTone: 0 }));
    expect(loadState(localStorage, NOW_MS).list).toEqual(EMPTY);
  });

  it.each([-1, 1.5, Number.NaN])('rejects invalid nextTone %s', (nextTone) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks: [], nextTone }));
    expect(loadState(localStorage, NOW_MS).list).toEqual(EMPTY);
  });
});

describe('saveState', () => {
  it('saveState returns false when setItem throws', () => {
    const storage = stubStorage({ setItem: () => { throw new DOMException('full', 'QuotaExceededError'); } });
    expect(saveState(storage, SAMPLE)).toBe(false);
  });
});

describe('resolveStorage', () => {
  it('returns the real storage when accessible', () => {
    expect(resolveStorage(() => localStorage)).toBe(localStorage);
  });

  it('falls back to working in-memory storage when access throws', () => {
    const storage = resolveStorage(() => { throw new DOMException('blocked', 'SecurityError'); });

    storage.setItem('k', 'v');
    expect(storage.getItem('k')).toBe('v');
    expect(storage.getItem('missing')).toBeNull();
  });
});
