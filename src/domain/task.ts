export type Tone = 'black' | 'red' | 'yellow';
export const TONES: readonly Tone[] = ['black', 'red', 'yellow'];

export interface Task {
  readonly id: string;
  title: string;
  /** "HH:MM" or "" when the task has no time. */
  time: string;
  note: string;
  readonly tone: Tone;
  /** Local date key of the day it was ticked; done today iff equal to today's key. */
  doneOn: string | null;
  readonly createdAt: number;
}

export interface TaskDraft {
  title: string;
  time: string;
  note: string;
}

export interface TaskList {
  readonly tasks: readonly Task[];
  readonly nextTone: number;
}

export function isDoneOn(task: Task, today: string): boolean {
  return task.doneOn === today;
}

export function addTask(list: TaskList, draft: TaskDraft, now: Date, makeId: () => string): TaskList {
  const title = draft.title.trim();
  if (!title) return list;

  const task: Task = {
    id: makeId(),
    title,
    time: draft.time,
    note: draft.note.trim(),
    tone: TONES[list.nextTone % TONES.length],
    doneOn: null,
    createdAt: now.getTime(),
  };
  return { tasks: [...list.tasks, task], nextTone: list.nextTone + 1 };
}

export function updateTask(list: TaskList, id: string, draft: TaskDraft): TaskList {
  const title = draft.title.trim();
  if (!title) return list;

  return mapTask(list, id, (task) => ({ ...task, title, time: draft.time, note: draft.note.trim() }));
}

export function deleteTask(list: TaskList, id: string): TaskList {
  return { ...list, tasks: list.tasks.filter((task) => task.id !== id) };
}

export function toggleDone(list: TaskList, id: string, today: string): TaskList {
  return mapTask(list, id, (task) => ({ ...task, doneOn: isDoneOn(task, today) ? null : today }));
}

function mapTask(list: TaskList, id: string, change: (task: Task) => Task): TaskList {
  return { ...list, tasks: list.tasks.map((task) => (task.id === id ? change(task) : task)) };
}
