import type { AppDeps, Mounted } from '../deps';
import { addEvent, addMonths, datesWithEvents, deleteEvent, eventsOn, monthGrid, updateEvent, type EventList, type MonthRef } from '../domain/calendar';
import { localDateKey } from '../domain/day';
import { CALENDAR_KEY, loadEvents, saveEvents } from '../storage/calendarStore';
import { DUCK_FAB_SVG, DUCK_SVG } from '../ui/art';
import { backButton } from '../ui/back';
import { WEEKDAY_LETTERS, dateFromKey, dayTitle, monthTitle, renderDayEvents, renderMonth } from '../ui/calendarView';
import { COPY } from '../ui/copy';
import { bindPress } from '../ui/press';
import { createSheet } from '../ui/sheet';

const EVENT_SELECTOR = '.event';

export function mountCalendar(root: HTMLElement, deps: AppDeps, onBack: () => void): Mounted {
  const loaded = loadEvents(deps.storage, deps.now().getTime());
  let list: EventList = loaded.list;
  let canPersist = loaded.canPersist;
  const today = (): string => localDateKey(deps.now());
  let selected = today();
  let visible = monthOf(selected);

  const shell = buildShell(onBack);
  root.replaceChildren(shell.app);

  const render = (): void => {
    shell.title.textContent = monthTitle(visible);
    renderMonth(shell.grid, monthGrid(visible.year, visible.month), { today: today(), selected, marked: datesWithEvents(list.events) });
    shell.dayTitle.textContent = dayTitle(selected);
    renderDayEvents(shell.events, eventsOn(list.events, selected));
  };

  const commit = (next: EventList): void => {
    list = next;
    if (canPersist) saveEvents(deps.storage, list);
    render();
  };

  const showMonth = (next: MonthRef): void => {
    visible = next;
    const todayKey = today();
    const todayMonth = monthOf(todayKey);
    selected = todayMonth.year === next.year && todayMonth.month === next.month
      ? todayKey
      : localDateKey(new Date(next.year, next.month, 1));
    render();
  };

  const sheet = createSheet(shell.app, {
    onSave: (draft, editingId) => commit(
      editingId === null ? addEvent(list, selected, draft, deps.now(), deps.makeId) : updateEvent(list, editingId, draft),
    ),
    onDelete: (id) => commit(deleteEvent(list, id)),
    confirm: deps.confirm,
  }, { newTitle: COPY.sheetNewEvent, editTitle: COPY.sheetEditEvent, name: COPY.fieldEventName });

  shell.grid.addEventListener('click', (event) => {
    const dayButton = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-date]') : null;
    const dateKey = dayButton?.dataset.date;
    if (!dateKey) return;
    selected = dateKey;
    visible = monthOf(dateKey);
    render();
  });
  shell.prev.addEventListener('click', () => showMonth(addMonths(visible, -1)));
  shell.next.addEventListener('click', () => showMonth(addMonths(visible, 1)));
  shell.fab.addEventListener('click', () => sheet.open(null));

  const unbindPress = bindPress(shell.events, {
    onTap: () => {},
    onLongPress: (row) => sheet.open(list.events.find((entry) => entry.id === row.dataset.id) ?? null),
  }, EVENT_SELECTOR);

  // Another instance (browser tab vs installed app) saved: adopt its events so neither overwrites the other.
  const onStorage = (event: StorageEvent): void => {
    if (event.key !== CALENDAR_KEY && event.key !== null) return;
    const reloaded = loadEvents(deps.storage, deps.now().getTime());
    list = reloaded.list;
    canPersist = reloaded.canPersist;
    render();
  };
  const onVisibility = (): void => {
    if (document.visibilityState === 'visible') render();
  };
  window.addEventListener('storage', onStorage);
  document.addEventListener('visibilitychange', onVisibility);

  render();

  return {
    stop() {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
      unbindPress();
    },
  };
}

function monthOf(dateKey: string): MonthRef {
  const date = dateFromKey(dateKey);
  return { year: date.getFullYear(), month: date.getMonth() };
}

interface Shell {
  app: HTMLElement;
  title: HTMLElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  grid: HTMLElement;
  dayTitle: HTMLElement;
  events: HTMLElement;
  fab: HTMLButtonElement;
}

function buildShell(onBack: () => void): Shell {
  const app = document.createElement('div');
  app.className = 'app duck-theme';
  app.dataset.screen = 'calendar';

  const head = document.createElement('header');
  head.className = 'head cal-head';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'me';
  const mascot = document.createElement('span');
  mascot.className = 'mascot';
  mascot.innerHTML = DUCK_SVG;
  head.append(backButton(onBack), logo, mascot);

  const nav = document.createElement('nav');
  nav.className = 'cal-nav';
  const prev = navButton('prev-month', COPY.prevMonth, '›');
  const title = document.createElement('h2');
  title.className = 'month-title';
  const next = navButton('next-month', COPY.nextMonth, '‹');
  nav.append(prev, title, next);

  const weekdays = document.createElement('div');
  weekdays.className = 'weekdays';
  weekdays.append(...WEEKDAY_LETTERS.map((letter) => {
    const span = document.createElement('span');
    span.textContent = letter;
    return span;
  }));

  const grid = document.createElement('div');
  grid.className = 'month-grid';

  const body = document.createElement('main');
  body.className = 'feed cal-body';
  const dayTitleNode = document.createElement('h3');
  dayTitleNode.className = 'day-title';
  const events = document.createElement('div');
  events.className = 'day-events';
  body.append(nav, weekdays, grid, dayTitleNode, events);

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'fab';
  fab.setAttribute('aria-label', COPY.addEventLabel);
  fab.innerHTML = DUCK_FAB_SVG;

  app.append(head, body, fab);
  return { app, title, prev, next, grid, dayTitle: dayTitleNode, events, fab };
}

function navButton(className: string, label: string, glyph: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `month-nav ${className}`;
  button.setAttribute('aria-label', label);
  button.textContent = glyph;
  return button;
}
