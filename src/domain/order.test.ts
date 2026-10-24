import { visibleTasks } from './order';
import type { Task } from './task';

const TODAY = '2026-10-24';
const YESTERDAY = '2026-10-23';

function task(title: string, time: string, createdAt: number, doneOn: string | null = null): Task {
  return { id: title, title, time, note: '', tone: 'black', doneOn, createdAt };
}

const FIXTURE: readonly Task[] = [
  task('read', '', 1),
  task('dance', '16:00', 2),
  task('teeth', '07:00', 3, TODAY),
  task('draw', '', 4),
  task('bed', '07:10', 5, YESTERDAY),
  task('pack', '', 6, TODAY),
];

describe('visibleTasks', () => {
  it('orders undone timed, undone untimed, then done with same sub-order', () => {
    const actual = visibleTasks(FIXTURE, 'all', TODAY).map((entry) => entry.title);
    expect(actual).toEqual(['bed', 'dance', 'read', 'draw', 'teeth', 'pack']);
  });

  it('done filter returns only tasks done today', () => {
    const actual = visibleTasks(FIXTURE, 'done', TODAY).map((entry) => entry.title);
    expect(actual).toEqual(['teeth', 'pack']);
  });
});
