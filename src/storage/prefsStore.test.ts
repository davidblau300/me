import { PREFS_KEY, loadPrefs, savePrefs } from './prefsStore';
import { DEFAULT_PREFS } from '../prefs/prefs';

afterEach(() => localStorage.clear());

describe('prefs store', () => {
  it('returns defaults when nothing is saved', () => {
    expect(loadPrefs(localStorage)).toEqual(DEFAULT_PREFS);
  });

  it('round-trips prefs', () => {
    expect(savePrefs(localStorage, { font: 'suez', palette: 'candy' })).toBe(true);
    expect(loadPrefs(localStorage)).toEqual({ font: 'suez', palette: 'candy' });
  });

  it('falls back to defaults for unreadable prefs', () => {
    localStorage.setItem(PREFS_KEY, '{oops');
    expect(loadPrefs(localStorage)).toEqual(DEFAULT_PREFS);
  });
});
