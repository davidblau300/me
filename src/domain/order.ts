import { compareBySchedule } from './schedule';
import { isDoneOn, type Task } from './task';

export type Filter = 'all' | 'done';

export function visibleTasks(tasks: readonly Task[], filter: Filter, today: string): Task[] {
  const shown = filter === 'done' ? tasks.filter((task) => isDoneOn(task, today)) : tasks;
  return [...shown].sort((left, right) => compareTasks(left, right, today));
}

function compareTasks(left: Task, right: Task, today: string): number {
  const leftDone = isDoneOn(left, today);
  if (leftDone !== isDoneOn(right, today)) return leftDone ? 1 : -1;
  return compareBySchedule(left, right);
}
