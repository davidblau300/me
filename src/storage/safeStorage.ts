export interface LoadResult<T> {
  value: T;
  /** False when saving could destroy data we failed to read or back up — the session stays in memory only. */
  canPersist: boolean;
}

/** Reads `key`, validating with `parse`; never silently destroys unreadable data — each bad payload is copied to `corruptPrefix + nowMs`. */
export function loadValidated<T>(
  storage: Storage,
  key: string,
  corruptPrefix: string,
  nowMs: number,
  parse: (value: unknown) => T | null,
  empty: T,
): LoadResult<T> {
  let raw: string | null;
  try {
    raw = storage.getItem(key);
  } catch {
    return { value: empty, canPersist: false };
  }
  if (raw === null) return { value: empty, canPersist: true };

  const parsed = parseJson(raw, parse);
  if (parsed !== null) return { value: parsed, canPersist: true };

  const backedUp = writeBestEffort(storage, `${corruptPrefix}${nowMs}`, raw);
  return { value: empty, canPersist: backedUp };
}

// Best-effort: a failed write must not break the user's action; the in-memory state stays authoritative.
export function writeBestEffort(storage: Storage, key: string, value: string): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** Chrome throws on merely touching `localStorage` when site data is blocked; fall back to memory so the app still opens. */
export function resolveStorage(getStorage: () => Storage): Storage {
  try {
    const storage = getStorage();
    storage.getItem('');
    return storage;
  } catch {
    return createMemoryStorage();
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseJson<T>(raw: string, parse: (value: unknown) => T | null): T | null {
  try {
    return parse(JSON.parse(raw));
  } catch {
    return null;
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
