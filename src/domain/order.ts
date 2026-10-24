import { isDoneOn, type Task } from './task';

export type Filter = 'all' | 'done';

export function visibleTasks(tasks: readonly Task[], filter: Filter, today: string): Task[] {
  const shown = filter === 'done' ? tasks.filter((task) => isDoneOn(task, today)) : tasks;
  return [...shown].sort((left, right) => compareTasks(left, right, today));
}

function compareTasks(left: Task, right: Task, today: string): number {
  const leftDone = isDoneOn(left, today);
  if (leftDone !== isDoneOn(right, today)) return leftDone ? 1 : -1;
  if (left.time && right.time && left.time !== right.time) return left.time < right.time ? -1 : 1;
  if (Boolean(left.time) !== Boolean(right.time)) return left.time ? -1 : 1;
  return left.createdAt - right.createdAt;
}
