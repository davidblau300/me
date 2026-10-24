import { localDateKey } from './domain/day';
import type { Filter } from './domain/order';
import { addTask, deleteTask, toggleDone, updateTask, type TaskList } from './domain/task';
import { loadState, saveState } from './storage/store';
import { FAB_SVG, MOUSE_SVG } from './ui/art';
import { COPY } from './ui/copy';
import { renderList } from './ui/list';
import { bindPress } from './ui/press';
import { createSheet } from './ui/sheet';

export const DAY_CHECK_MS = 60_000;
const ROW_SELECTOR = '.row';

export interface AppDeps {
  storage: Storage;
  now: () => Date;
  makeId: () => string;
  confirm: (message: string) => boolean;
}

export function startApp(root: HTMLElement, deps: AppDeps): { stop(): void } {
  let list: TaskList = loadState(deps.storage);
  let filter: Filter = 'all';
  let renderedDay = localDateKey(deps.now());

  const shell = buildShell();
  root.replaceChildren(shell.app);

  const render = (): void => {
    renderedDay = localDateKey(deps.now());
    renderList(shell.feed, list.tasks, filter, renderedDay);
    for (const chip of shell.chips) chip.classList.toggle('on', chip.dataset.filter === filter);
  };

  const commit = (next: TaskList): void => {
    list = next;
    saveState(deps.storage, list);
    render();
  };

  const sheet = createSheet(shell.app, {
    onSave: (draft, editingId) => commit(
      editingId === null ? addTask(list, draft, deps.now(), deps.makeId) : updateTask(list, editingId, draft),
    ),
    onDelete: (id) => commit(deleteTask(list, id)),
    confirm: deps.confirm,
  });

  const unbindPress = bindPress(shell.feed, {
    onTap: (row) => commit(toggleDone(list, row.dataset.id ?? '', localDateKey(deps.now()))),
    onLongPress: (row) => sheet.open(list.tasks.find((task) => task.id === row.dataset.id) ?? null),
  }, ROW_SELECTOR);

  for (const chip of shell.chips) {
    chip.addEventListener('click', () => {
      filter = chip.dataset.filter === 'done' ? 'done' : 'all';
      render();
    });
  }
  shell.fab.addEventListener('click', () => sheet.open(null));

  // Daily reset is derived from the date, so a new day only needs a re-render.
  const renderIfNewDay = (): void => {
    if (localDateKey(deps.now()) !== renderedDay) render();
  };
  const onVisibility = (): void => {
    if (document.visibilityState === 'visible') renderIfNewDay();
  };
  const dayTimer = setInterval(renderIfNewDay, DAY_CHECK_MS);
  document.addEventListener('visibilitychange', onVisibility);

  render();

  return {
    stop() {
      clearInterval(dayTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      unbindPress();
    },
  };
}

interface Shell {
  app: HTMLElement;
  feed: HTMLElement;
  chips: HTMLButtonElement[];
  fab: HTMLButtonElement;
}

function buildShell(): Shell {
  const app = document.createElement('div');
  app.className = 'app';

  const head = document.createElement('header');
  head.className = 'head';
  const brand = document.createElement('div');
  brand.className = 'brand';
  const ears = document.createElement('span');
  ears.className = 'ears';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'me';
  ears.append(logo);
  brand.append(ears);

  const chipRow = document.createElement('nav');
  chipRow.className = 'chips';
  const chips = [chip('all', COPY.tabToday), chip('done', COPY.tabDone)];
  const mouseSlot = document.createElement('span');
  mouseSlot.className = 'mouse-slot';
  mouseSlot.innerHTML = MOUSE_SVG;
  chips[1].append(mouseSlot);
  chipRow.append(...chips);
  head.append(brand, chipRow);

  const feed = document.createElement('main');
  feed.className = 'feed';

  const fab = document.createElement('button');
  fab.className = 'fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', COPY.addLabel);
  fab.innerHTML = FAB_SVG;

  app.append(head, feed, fab);
  return { app, feed, chips, fab };
}

function chip(filter: Filter, label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'chip';
  button.dataset.filter = filter;
  button.textContent = label;
  return button;
}
