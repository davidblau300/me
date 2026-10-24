import { TONES, type Task, type TaskList, type Tone } from '../domain/task';

export const STORAGE_KEY = 'me:v1';
export const CORRUPT_KEY = 'me:v1:corrupt';
export const SCHEMA_VERSION = 1;

const EMPTY_STATE: TaskList = { tasks: [], nextTone: 0 };

interface StoredState {
  version: typeof SCHEMA_VERSION;
  tasks: Task[];
  nextTone: number;
}

export function loadState(storage: Storage): TaskList {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return EMPTY_STATE;

  const parsed = parseStoredState(raw);
  if (parsed) return { tasks: parsed.tasks, nextTone: parsed.nextTone };

  // Never silently destroy her data: keep the unreadable payload for manual recovery.
  writeBestEffort(storage, CORRUPT_KEY, raw);
  return EMPTY_STATE;
}

// Best-effort: a failed write must not break ticking; the in-memory list stays authoritative.
export function saveState(storage: Storage, list: TaskList): boolean {
  const stored: StoredState = { version: SCHEMA_VERSION, tasks: [...list.tasks], nextTone: list.nextTone };
  return writeBestEffort(storage, STORAGE_KEY, JSON.stringify(stored));
}

export async function requestPersistence(): Promise<void> {
  try {
    await navigator.storage?.persist?.();
  } catch {
    // Persistence is a hint; the app works without it.
  }
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
    && typeof value.nextTone === 'number'
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
