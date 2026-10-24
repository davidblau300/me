import { SCHEDULE_FIXTURE } from './fixture';

// Node's Buffer (available under Vitest) — mirrors how scripts/schedule-link.mjs builds the payload.
declare const Buffer: { from(input: string, encoding?: string): { toString(encoding: string): string } };
import { daySlots, decodeSchedule, encodeSchedule, isCurrentSlot, parseSchedule, schoolDayIndex, subjectTone } from './schedule';

describe('parseSchedule', () => {
  it('accepts a valid schedule', () => {
    expect(parseSchedule(JSON.parse(JSON.stringify(SCHEDULE_FIXTURE)))).toEqual(SCHEDULE_FIXTURE);
  });

  it('rejects a lessons row without six days', () => {
    const broken = { ...SCHEDULE_FIXTURE, slots: [{ kind: 'lessons', time: '', label: '', cells: [['א']] }] };
    expect(parseSchedule(broken)).toBeNull();
  });

  it('rejects an unknown slot kind', () => {
    expect(parseSchedule({ version: 1, slots: [{ kind: 'party', time: '', title: 'x' }] })).toBeNull();
  });

  it('rejects a cell with an empty line list', () => {
    const cells = [[], ['a'], ['a'], ['a'], ['a'], ['a']];
    expect(parseSchedule({ version: 1, slots: [{ kind: 'lessons', time: '', label: '', cells }] })).toBeNull();
  });
});

describe('encodeSchedule / decodeSchedule', () => {
  it('round-trips Hebrew text through a URL-safe payload', () => {
    const payload = encodeSchedule(SCHEDULE_FIXTURE);

    expect(payload).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeSchedule(payload)).toEqual(SCHEDULE_FIXTURE);
  });

  it('decodes a payload made with Node Buffer base64url', () => {
    const payload = Buffer.from(JSON.stringify(SCHEDULE_FIXTURE), 'utf8').toString('base64url');
    expect(decodeSchedule(payload)).toEqual(SCHEDULE_FIXTURE);
  });

  it('returns null for garbage', () => {
    expect(decodeSchedule('%%%')).toBeNull();
    expect(decodeSchedule(Buffer.from('{"nope":1}').toString('base64url'))).toBeNull();
  });
});

describe('schoolDayIndex', () => {
  it('maps Sunday..Friday to 0..5 and Saturday to Sunday', () => {
    expect(schoolDayIndex(new Date(2026, 9, 25))).toBe(0);
    expect(schoolDayIndex(new Date(2026, 9, 27))).toBe(2);
    expect(schoolDayIndex(new Date(2026, 9, 30))).toBe(5);
    expect(schoolDayIndex(new Date(2026, 9, 24))).toBe(0);
  });
});

describe('daySlots', () => {
  it('keeps lessons for that day and drops empty cells', () => {
    const rows = daySlots(SCHEDULE_FIXTURE, 3);
    expect(rows.map((row) => (row.kind === 'lesson' ? row.lines[0] : row.title))).toEqual(['משחק', 'חנ״ג', 'הפסקה', 'הפסקה קטנה', 'תח״ס']);
  });

  it('drops ribbons with no lesson after them', () => {
    const rows = daySlots(SCHEDULE_FIXTURE, 5);
    expect(rows.map((row) => (row.kind === 'lesson' ? row.lines[0] : row.title))).toEqual(['יצירה', 'חינוך']);
  });
});

describe('isCurrentSlot', () => {
  it('is true only inside the time range', () => {
    expect(isCurrentSlot('8:00-8:50', new Date(2026, 9, 27, 8, 0))).toBe(true);
    expect(isCurrentSlot('8:00-8:50', new Date(2026, 9, 27, 8, 49))).toBe(true);
    expect(isCurrentSlot('8:00-8:50', new Date(2026, 9, 27, 8, 50))).toBe(false);
    expect(isCurrentSlot('', new Date(2026, 9, 27, 8, 10))).toBe(false);
  });
});

describe('subjectTone', () => {
  it.each([
    ['שפה', 'lang'],
    ['מתמטיקה', 'math'],
    ['גאומטריה', 'math'],
    ['אנגלית', 'english'],
    ['חנ״ג', 'pe'],
    ['חנ"ג', 'pe'],
    ['מדעים', 'science'],
    ['יזמות', 'other'],
  ])('%s → %s', (subject, tone) => {
    expect(subjectTone(subject)).toBe(tone);
  });
});
