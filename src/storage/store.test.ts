import { CORRUPT_KEY, STORAGE_KEY, loadState, saveState } from './store';
import type { TaskList } from '../domain/task';

const SAMPLE: TaskList = {
  tasks: [{ id: 'a', title: 'לקרוא', time: '', note: '', tone: 'red', doneOn: '2026-10-24', createdAt: 5 }],
  nextTone: 2,
};

afterEach(() => localStorage.clear());

describe('loadState', () => {
  it('returns empty state when nothing stored', () => {
    expect(loadState(localStorage)).toEqual({ tasks: [], nextTone: 0 });
  });

  it('round-trips saved state', () => {
    expect(saveState(localStorage, SAMPLE)).toBe(true);
    expect(loadState(localStorage)).toEqual(SAMPLE);
  });

  it('keeps corrupt payload aside and returns empty state', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');

    expect(loadState(localStorage)).toEqual({ tasks: [], nextTone: 0 });
    expect(localStorage.getItem(CORRUPT_KEY)).toBe('{not json');
  });

  it('rejects wrong schema version', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, tasks: [], nextTone: 0 }));
    expect(loadState(localStorage)).toEqual({ tasks: [], nextTone: 0 });
  });

  it('rejects task without string title', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks: [{ id: 'a', title: 3 }], nextTone: 0 }));
    expect(loadState(localStorage)).toEqual({ tasks: [], nextTone: 0 });
  });
});

describe('saveState', () => {
  it('saveState returns false when setItem throws', () => {
    const throwingStorage = {
      ...localStorage,
      getItem: () => null,
      setItem: () => { throw new DOMException('full', 'QuotaExceededError'); },
    } as unknown as Storage;

    expect(saveState(throwingStorage, SAMPLE)).toBe(false);
  });
});
