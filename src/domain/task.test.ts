import { addTask, deleteTask, isDoneOn, toggleDone, updateTask, type Task, type TaskList } from './task';

const EMPTY_LIST: TaskList = { tasks: [], nextTone: 0 };
const NOW = new Date(2026, 9, 24, 8, 0);
const TODAY = '2026-10-24';

function idFactory(): () => string {
  let counter = 0;
  return () => `id-${++counter}`;
}

function draft(title: string, time = '', note = '') {
  return { title, time, note };
}

describe('addTask', () => {
  it('rotates tones black, red, yellow, black', () => {
    const makeId = idFactory();
    let list = EMPTY_LIST;
    for (const title of ['a', 'b', 'c', 'd']) list = addTask(list, draft(title), NOW, makeId);

    expect(list.tasks.map((task) => task.tone)).toEqual(['black', 'red', 'yellow', 'black']);
    expect(list.nextTone).toBe(4);
  });

  it('trims title and note and starts not done', () => {
    const actual = addTask(EMPTY_LIST, draft('  לקרוא  ', '07:30', '  עמוד 4 '), NOW, idFactory());

    expect(actual.tasks[0]).toEqual({
      id: 'id-1', title: 'לקרוא', time: '07:30', note: 'עמוד 4', tone: 'black', doneOn: null, createdAt: NOW.getTime(),
    });
  });

  it('ignores blank title', () => {
    expect(addTask(EMPTY_LIST, draft('   '), NOW, idFactory())).toBe(EMPTY_LIST);
  });
});

describe('updateTask', () => {
  it('keeps tone, doneOn and createdAt', () => {
    const base = toggleDone(addTask(EMPTY_LIST, draft('a'), NOW, idFactory()), 'id-1', TODAY);

    const actual = updateTask(base, 'id-1', draft(' b ', '09:00', 'n')).tasks[0];

    expect(actual).toEqual({ ...base.tasks[0], title: 'b', time: '09:00', note: 'n' });
  });

  it('ignores blank title', () => {
    const base = addTask(EMPTY_LIST, draft('a'), NOW, idFactory());
    expect(updateTask(base, 'id-1', draft(' '))).toBe(base);
  });
});

describe('deleteTask', () => {
  it('removes only the given task', () => {
    const makeId = idFactory();
    const base = addTask(addTask(EMPTY_LIST, draft('a'), NOW, makeId), draft('b'), NOW, makeId);
    expect(deleteTask(base, 'id-1').tasks.map((task) => task.title)).toEqual(['b']);
  });
});

describe('toggleDone / isDoneOn', () => {
  it('toggleDone marks today then unmarks', () => {
    const base = addTask(EMPTY_LIST, draft('a'), NOW, idFactory());
    const ticked = toggleDone(base, 'id-1', TODAY);
    expect(isDoneOn(ticked.tasks[0], TODAY)).toBe(true);
    expect(isDoneOn(toggleDone(ticked, 'id-1', TODAY).tasks[0], TODAY)).toBe(false);
  });

  it('task done yesterday is not done today', () => {
    const task: Task = { id: 'x', title: 'a', time: '', note: '', tone: 'red', doneOn: '2026-10-23', createdAt: 0 };
    expect(isDoneOn(task, TODAY)).toBe(false);
  });

  it('ticking a task done yesterday marks it done today', () => {
    const list: TaskList = {
      tasks: [{ id: 'x', title: 'a', time: '', note: '', tone: 'red', doneOn: '2026-10-23', createdAt: 0 }],
      nextTone: 1,
    };
    expect(toggleDone(list, 'x', TODAY).tasks[0].doneOn).toBe(TODAY);
  });
});
