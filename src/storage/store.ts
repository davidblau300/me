import { TONES, type Task, type TaskList, type Tone } from '../domain/task';
import { isRecord, loadValidated, writeBestEffort } from './safeStorage';

export { resolveStorage } from './safeStorage';

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
  canPersist: boolean;
}

export function loadState(storage: Storage, nowMs: number): LoadResult {
  const { value, canPersist } = loadValidated(storage, STORAGE_KEY, CORRUPT_KEY_PREFIX, nowMs, parseTaskList, EMPTY_STATE);
  return { list: value, canPersist };
}

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

function parseTaskList(value: unknown): TaskList | null {
  if (!isStoredState(value)) return null;
  return { tasks: value.tasks, nextTone: value.nextTone };
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
