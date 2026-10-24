import { parseSchedule, type Schedule } from '../schedule/schedule';
import { loadValidated, writeBestEffort } from './safeStorage';

export const SCHEDULE_KEY = 'me:schedule:v1';
export const SCHEDULE_CORRUPT_PREFIX = 'me:schedule:v1:corrupt:';

export function loadSchedule(storage: Storage, nowMs: number): { schedule: Schedule | null; canPersist: boolean } {
  const { value, canPersist } = loadValidated<Schedule | null>(storage, SCHEDULE_KEY, SCHEDULE_CORRUPT_PREFIX, nowMs, parseSchedule, null);
  return { schedule: value, canPersist };
}

export function saveSchedule(storage: Storage, schedule: Schedule): boolean {
  return writeBestEffort(storage, SCHEDULE_KEY, JSON.stringify(schedule));
}
