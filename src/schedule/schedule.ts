import { isRecord } from '../storage/safeStorage';

export const SCHOOL_DAYS = 6;
const SATURDAY = 6;
const MINUTES_PER_HOUR = 60;
const TIME_RANGE_PATTERN = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;

/** Cell lines: first is the subject, the rest are details (teacher, topic). Null = no lesson that day. */
export type Cell = string[] | null;

export type Slot =
  | { kind: 'lessons'; time: string; label: string; cells: Cell[] }
  | { kind: 'ribbon'; time: string; title: string };

export interface Schedule {
  version: 1;
  slots: Slot[];
}

export type DayRow =
  | { kind: 'lesson'; time: string; label: string; lines: string[] }
  | { kind: 'ribbon'; time: string; title: string };

export type SubjectTone = 'lang' | 'math' | 'english' | 'pe' | 'science' | 'other';

const TONE_KEYWORDS: ReadonlyArray<{ tone: SubjectTone; keywords: readonly string[] }> = [
  { tone: 'lang', keywords: ['שפה'] },
  { tone: 'math', keywords: ['מתמטיקה', 'גאומטריה'] },
  { tone: 'english', keywords: ['אנגלית'] },
  { tone: 'pe', keywords: ['חנ״ג'] },
  { tone: 'science', keywords: ['מדעים'] },
];

export function parseSchedule(value: unknown): Schedule | null {
  if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.slots)) return null;
  return value.slots.every(isSlot) ? { version: 1, slots: value.slots } : null;
}

export function encodeSchedule(schedule: Schedule): string {
  const bytes = new TextEncoder().encode(JSON.stringify(schedule));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSchedule(payload: string): Schedule | null {
  try {
    const binary = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return parseSchedule(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)));
  } catch {
    return null;
  }
}

/** Sunday..Friday → 0..5; Saturday shows Sunday, the next school day. */
export function schoolDayIndex(date: Date): number {
  const weekday = date.getDay();
  return weekday === SATURDAY ? 0 : weekday;
}

/** One day's rows; a break is shown only while that day still has a lesson after it. */
export function daySlots(schedule: Schedule, dayIndex: number): DayRow[] {
  return schedule.slots.flatMap((slot, index): DayRow[] => {
    if (slot.kind === 'lessons') {
      const cell = slot.cells[dayIndex];
      return cell ? [{ kind: 'lesson', time: slot.time, label: slot.label, lines: cell }] : [];
    }
    const lessonFollows = schedule.slots.slice(index + 1).some((later) => later.kind === 'lessons' && later.cells[dayIndex] !== null);
    return lessonFollows ? [{ kind: 'ribbon', time: slot.time, title: slot.title }] : [];
  });
}

export function isCurrentSlot(time: string, now: Date): boolean {
  const match = TIME_RANGE_PATTERN.exec(time);
  if (!match) return false;
  const [startHour, startMinute, endHour, endMinute] = match.slice(1).map(Number);
  const minutes = now.getHours() * MINUTES_PER_HOUR + now.getMinutes();
  return minutes >= startHour * MINUTES_PER_HOUR + startMinute && minutes < endHour * MINUTES_PER_HOUR + endMinute;
}

export function subjectTone(subject: string): SubjectTone {
  const normalized = subject.replace(/"/g, '״');
  return TONE_KEYWORDS.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)))?.tone ?? 'other';
}

function isSlot(value: unknown): value is Slot {
  if (!isRecord(value) || typeof value.time !== 'string') return false;
  if (value.kind === 'ribbon') return typeof value.title === 'string';
  if (value.kind !== 'lessons' || typeof value.label !== 'string' || !Array.isArray(value.cells)) return false;
  return value.cells.length === SCHOOL_DAYS && value.cells.every(isCell);
}

function isCell(value: unknown): value is Cell {
  if (value === null) return true;
  return Array.isArray(value) && value.length > 0 && value.every((line) => typeof line === 'string');
}
