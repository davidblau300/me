import type { AppDeps, Mounted } from '../deps';
import { localDateKey } from '../domain/day';
import type { Filter } from '../domain/order';
import { addTask, deleteTask, toggleDone, updateTask, type TaskList } from '../domain/task';
import { STORAGE_KEY, loadState, saveState } from '../storage/store';
import { CROWN_SVG, ORBS_SVG } from '../ui/art';
import { CAST_ART, type CastArt } from '../ui/castArt';
import { loadPrefs } from '../storage/prefsStore';
import { backButton } from '../ui/back';
import { COPY } from '../ui/copy';
import { renderList } from '../ui/list';
import { bindPress } from '../ui/press';
import { createSheet } from '../ui/sheet';

export const DAY_CHECK_MS = 60_000;
const ROW_SELECTOR = '.row';

const DECOR_CLASS = { ears: 'ears', crown: 'crowned', orbs: 'orbed' } as const;

export function mountTasks(root: HTMLElement, deps: AppDeps, onBack: () => void): Mounted {
  const loaded = loadState(deps.storage, deps.now().getTime());
  let list: TaskList = loaded.list;
  let canPersist = loaded.canPersist;
  let filter: Filter = 'all';
  let renderedDay = localDateKey(deps.now());

  const shell = buildShell(onBack, CAST_ART[loadPrefs(deps.storage).cast]);
  root.replaceChildren(shell.app);

  const render = (): void => {
    renderedDay = localDateKey(deps.now());
    renderList(shell.feed, list.tasks, filter, renderedDay);
    for (const chip of shell.chips) chip.classList.toggle('on', chip.dataset.filter === filter);
  };

  const commit = (next: TaskList): void => {
    list = next;
    if (canPersist) saveState(deps.storage, list);
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
  // Another instance (browser tab vs installed app) saved: adopt its list so neither overwrites the other.
  const onStorage = (event: StorageEvent): void => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    const reloaded = loadState(deps.storage, deps.now().getTime());
    list = reloaded.list;
    canPersist = reloaded.canPersist;
    render();
  };
  const dayTimer = setInterval(renderIfNewDay, DAY_CHECK_MS);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('storage', onStorage);

  render();

  return {
    stop() {
      clearInterval(dayTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('storage', onStorage);
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

function buildShell(onBack: () => void, art: CastArt): Shell {
  const app = document.createElement('div');
  app.className = 'app';
  app.dataset.screen = 'tasks';

  const head = document.createElement('header');
  head.className = 'head';
  const brand = document.createElement('div');
  brand.className = 'brand';
  brand.append(backButton(onBack));
  const decor = document.createElement('span');
  decor.className = DECOR_CLASS[art.logoDecor];
  if (art.logoDecor === 'crown') decor.innerHTML = CROWN_SVG;
  if (art.logoDecor === 'orbs') decor.innerHTML = ORBS_SVG;
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'me';
  decor.append(logo);
  brand.append(decor);

  const chipRow = document.createElement('nav');
  chipRow.className = 'chips';
  const chips = [chip('all', COPY.tabToday), chip('done', COPY.tabDone)];
  const mouseSlot = document.createElement('span');
  mouseSlot.className = 'mouse-slot';
  mouseSlot.innerHTML = art.chipMascot;
  chips[1].append(mouseSlot);
  chipRow.append(...chips);
  head.append(brand, chipRow);

  const feed = document.createElement('main');
  feed.className = 'feed';

  const fab = document.createElement('button');
  fab.className = 'fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', COPY.addLabel);
  fab.innerHTML = art.tasksFab;

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
