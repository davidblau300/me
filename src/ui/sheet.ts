import type { TaskDraft } from '../domain/task';
import { COPY } from './copy';

const FOCUS_DELAY_MS = 250;

export interface SheetHandlers {
  onSave: (draft: TaskDraft, editingId: string | null) => void;
  onDelete: (id: string) => void;
  confirm: (message: string) => boolean;
}

export interface SheetItem {
  readonly id: string;
  title: string;
  time: string;
  note: string;
}

export interface SheetLabels {
  newTitle: string;
  editTitle: string;
  name: string;
}

export const TASK_SHEET_LABELS: SheetLabels = { newTitle: COPY.sheetNew, editTitle: COPY.sheetEdit, name: COPY.fieldName };

export interface Sheet {
  open(item: SheetItem | null): void;
  close(): void;
}

export function createSheet(root: HTMLElement, handlers: SheetHandlers, labels: SheetLabels = TASK_SHEET_LABELS): Sheet {
  const scrim = document.createElement('div');
  scrim.className = 'scrim';

  const form = document.createElement('form');
  form.className = 'sheet';
  form.autocomplete = 'off';
  form.noValidate = true;

  const grip = document.createElement('div');
  grip.className = 'grip';
  const heading = document.createElement('h2');
  const titleInput = input('title', 'text', labels.name, 'name');
  const timeInput = input('time', 'time', COPY.fieldTime);
  const noteInput = input('note', 'text', COPY.fieldNote);

  const actions = document.createElement('div');
  actions.className = 'actions';
  const saveButton = button('save', COPY.save, 'submit');
  const deleteButton = button('del', COPY.remove, 'button');
  actions.append(saveButton, deleteButton);

  form.append(grip, heading, ...titleInput.nodes, ...timeInput.nodes, ...noteInput.nodes, actions);
  root.append(scrim, form);

  let editingId: string | null = null;

  const close = (): void => {
    form.classList.remove('open');
    scrim.classList.remove('open');
    titleInput.field.blur();
  };

  const open = (item: SheetItem | null): void => {
    editingId = item?.id ?? null;
    heading.textContent = item ? labels.editTitle : labels.newTitle;
    titleInput.field.value = item?.title ?? '';
    timeInput.field.value = item?.time ?? '';
    noteInput.field.value = item?.note ?? '';
    deleteButton.hidden = !item;
    form.classList.add('open');
    scrim.classList.add('open');
    if (!item) setTimeout(() => titleInput.field.focus(), FOCUS_DELAY_MS);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.field.value.trim();
    if (!title) return;
    handlers.onSave({ title, time: timeInput.field.value, note: noteInput.field.value.trim() }, editingId);
    close();
  });

  deleteButton.addEventListener('click', () => {
    if (editingId === null || !handlers.confirm(COPY.confirmDelete)) return;
    handlers.onDelete(editingId);
    close();
  });

  scrim.addEventListener('click', close);

  return { open, close };
}

function input(name: string, type: string, labelText: string, className?: string) {
  const id = `field-${name}`;
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const field = document.createElement('input');
  field.id = id;
  field.name = name;
  field.type = type;
  if (className) field.className = className;
  return { field, nodes: [label, field] as const };
}

function button(className: string, text: string, type: 'submit' | 'button'): HTMLButtonElement {
  const node = document.createElement('button');
  node.className = className;
  node.type = type;
  node.textContent = text;
  return node;
}
