import { TONES, type Task, type TaskList, type Tone } from '../domain/task';

export const STORAGE_KEY = 'me:v1';
export const CORRUPT_KEY_PREFIX = 'me:v1:corrupt:';
export const SCHEMA_VERSION = 1;

const EMPTY_STATE: TaskList = { tasks: [], nextTone: 0 };

interface StoredState {
  version: typeof SCHEMA_VERSION;
  tasks: Task[];
  nextTone: number;
}

export interface LoadResult {
  list: TaskList;
  /** False when saving could destroy data we failed to read or back up — the session stays in memory only. */
  canPersist: boolean;
}

export function loadState(storage: Storage, nowMs: number): LoadResult {
  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return { list: EMPTY_STATE, canPersist: false };
  }
  if (raw === null) return { list: EMPTY_STATE, canPersist: true };

  const parsed = parseStoredState(raw);
  if (parsed) return { list: { tasks: parsed.tasks, nextTone: parsed.nextTone }, canPersist: true };

  // Never silently destroy her data: keep every unreadable payload under its own key for manual recovery.
  const backedUp = writeBestEffort(storage, `${CORRUPT_KEY_PREFIX}${nowMs}`, raw);
  return { list: EMPTY_STATE, canPersist: backedUp };
}

// Best-effort: a failed write must not break ticking; the in-memory list stays authoritative.
export function saveState(storage: Storage, list: TaskList): boolean {
  const stored: StoredState = { version: SCHEMA_VERSION, tasks: [...list.tasks], nextTone: list.nextTone };
  return writeBestEffort(storage, STORAGE_KEY, JSON.stringify(stored));
}

/** Chrome throws on merely touching `localStorage` when site data is blocked; fall back to memory so the app still opens. */
export function resolveStorage(getStorage: () => Storage): Storage {
  try {
    const storage = getStorage();
    storage.getItem(STORAGE_KEY);
    return storage;
  } catch {
    return createMemoryStorage();
  }
}

export async function requestPersistence(): Promise<void> {
  try {
    await navigator.storage?.persist?.();
  } catch {
    // Persistence is a hint; the app works without it.
  }
}

function createMemoryStorage(): Storage {
  const entries = new Map<string, string>();
  return {
    get length() { return entries.size; },
    clear: () => entries.clear(),
    key: (index: number) => [...entries.keys()][index] ?? null,
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => { entries.set(key, value); },
    removeItem: (key: string) => { entries.delete(key); },
  };
}

function writeBestEffort(storage: Storage, key: string, value: string): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function parseStoredState(raw: string): StoredState | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  return isStoredState(value) ? value : null;
}

function isStoredState(value: unknown): value is StoredState {
  if (!isRecord(value)) return false;
  return value.version === SCHEMA_VERSION
    && Number.isInteger(value.nextTone)
    && (value.nextTone as number) >= 0
    && Array.isArray(value.tasks)
    && value.tasks.every(isTask);
}

function isTask(value: unknown): value is Task {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.time === 'string'
    && typeof value.note === 'string'
    && TONES.includes(value.tone as Tone)
    && (value.doneOn === null || typeof value.doneOn === 'string')
    && typeof value.createdAt === 'number';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
