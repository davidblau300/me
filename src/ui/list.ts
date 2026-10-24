import { visibleTasks, type Filter } from '../domain/order';
import { isDoneOn, type Task } from '../domain/task';
import { COPY } from './copy';

const SUB_SEPARATOR = ' · ';

export function renderList(container: HTMLElement, tasks: readonly Task[], filter: Filter, today: string): void {
  const shown = visibleTasks(tasks, filter, today);
  if (shown.length === 0) {
    container.replaceChildren(element('div', 'empty', filter === 'all' ? COPY.emptyAll : COPY.emptyDone));
    return;
  }
  container.replaceChildren(...shown.map((task) => renderRow(task, today)));
}

function renderRow(task: Task, today: string): HTMLElement {
  const row = element('div', `row tone-${task.tone}`);
  row.classList.toggle('done', isDoneOn(task, today));
  row.dataset.id = task.id;
  row.append(element('div', 'ttl', task.title));

  const subText = [task.time, task.note].filter(Boolean).join(SUB_SEPARATOR);
  if (subText) row.append(element('div', 'sub', subText));

  row.append(element('span', 'mini'));
  return row;
}

function element(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
