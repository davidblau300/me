export interface Scheduled {
  time: string;
  readonly createdAt: number;
}

/** Timed items first ("HH:MM" ascending), then untimed items in the order they were added. */
export function compareBySchedule(left: Scheduled, right: Scheduled): number {
  if (left.time && right.time && left.time !== right.time) return left.time < right.time ? -1 : 1;
  if (Boolean(left.time) !== Boolean(right.time)) return left.time ? -1 : 1;
  return left.createdAt - right.createdAt;
}
