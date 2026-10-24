import { renderList } from './list';
import { COPY } from './copy';
import type { Task } from '../domain/task';

const TODAY = '2026-10-24';

function task(overrides: Partial<Task> & { id: string }): Task {
  return { title: overrides.id, time: '', note: '', tone: 'black', doneOn: null, createdAt: 0, ...overrides };
}

let container: HTMLElement;
beforeEach(() => { container = document.createElement('div'); });

describe('renderList', () => {
  it('renders rows in visibleTasks order with tone class', () => {
    const tasks = [task({ id: 'late', time: '18:00', tone: 'red', createdAt: 1 }), task({ id: 'early', time: '07:00', tone: 'yellow', createdAt: 2 })];

    renderList(container, tasks, 'all', TODAY);

    const rows = [...container.querySelectorAll<HTMLElement>('.row')];
    expect(rows.map((row) => row.dataset.id)).toEqual(['early', 'late']);
    expect(rows[0].classList.contains('tone-yellow')).toBe(true);
    expect(rows[0].querySelector('.mini')).not.toBeNull();
  });

  it('marks rows done only for today', () => {
    renderList(container, [task({ id: 'a', doneOn: TODAY }), task({ id: 'b', doneOn: '2026-10-23' })], 'all', TODAY);

    expect(container.querySelector('[data-id="a"]')?.classList.contains('done')).toBe(true);
    expect(container.querySelector('[data-id="b"]')?.classList.contains('done')).toBe(false);
  });

  it('sub line joins time and note with middle dot', () => {
    renderList(container, [task({ id: 'a', time: '16:00', note: 'בקבוק מים' }), task({ id: 'b' })], 'all', TODAY);

    expect(container.querySelector('[data-id="a"] .sub')?.textContent).toBe('16:00 · בקבוק מים');
    expect(container.querySelector('[data-id="b"] .sub')).toBeNull();
  });

  it('shows emptyAll when there are no tasks', () => {
    renderList(container, [], 'all', TODAY);
    expect(container.querySelector('.empty')?.textContent).toBe(COPY.emptyAll);
  });

  it('shows emptyDone when nothing ticked today', () => {
    renderList(container, [task({ id: 'a' })], 'done', TODAY);
    expect(container.querySelector('.empty')?.textContent).toBe(COPY.emptyDone);
  });

  it('renders title as text not HTML', () => {
    renderList(container, [task({ id: 'a', title: '<b>x</b>' })], 'all', TODAY);

    expect(container.querySelector('b')).toBeNull();
    expect(container.querySelector('.ttl')?.textContent).toBe('<b>x</b>');
  });

  it('replaces previous content on rerender', () => {
    renderList(container, [task({ id: 'a' })], 'all', TODAY);
    renderList(container, [task({ id: 'b' })], 'all', TODAY);
    expect(container.querySelectorAll('.row')).toHaveLength(1);
  });
});
