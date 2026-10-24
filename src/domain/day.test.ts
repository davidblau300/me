import { localDateKey } from './day';

describe('localDateKey', () => {
  it('formats local date with zero padding', () => {
    expect(localDateKey(new Date(2026, 0, 5, 12, 0))).toBe('2026-01-05');
  });

  it('uses local day just before and after midnight', () => {
    expect(localDateKey(new Date(2026, 9, 24, 23, 59, 59))).toBe('2026-10-24');
    expect(localDateKey(new Date(2026, 9, 25, 0, 0, 1))).toBe('2026-10-25');
  });
});
