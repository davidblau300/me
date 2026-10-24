import { DEFAULT_PREFS, parsePrefs, type Prefs } from '../prefs/prefs';
import { writeBestEffort } from './safeStorage';

export const PREFS_KEY = 'me:prefs:v1';

// Cosmetic choices: an unreadable value just falls back to the defaults.
export function loadPrefs(storage: Storage): Prefs {
  try {
    const raw = storage.getItem(PREFS_KEY);
    return raw === null ? DEFAULT_PREFS : parsePrefs(JSON.parse(raw)) ?? DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(storage: Storage, prefs: Prefs): boolean {
  return writeBestEffort(storage, PREFS_KEY, JSON.stringify({ version: 1, ...prefs }));
}
