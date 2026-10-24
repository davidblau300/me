import type { Mock } from 'vitest';
import { createSheet, type SheetHandlers } from './sheet';
import { COPY } from './copy';
import type { Task } from '../domain/task';

const TASK: Task = { id: 't1', title: 'חוג ריקוד', time: '16:00', note: 'מים', tone: 'red', doneOn: null, createdAt: 0 };

let root: HTMLElement;
let handlers: {
  onSave: Mock<SheetHandlers['onSave']>;
  onDelete: Mock<SheetHandlers['onDelete']>;
  confirm: Mock<SheetHandlers['confirm']>;
};

function field(name: string): HTMLInputElement {
  return root.querySelector<HTMLInputElement>(`[name="${name}"]`)!;
}

function submit(): void {
  root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

beforeEach(() => {
  root = document.createElement('div');
  document.body.append(root);
  handlers = {
    onSave: vi.fn<SheetHandlers['onSave']>(),
    onDelete: vi.fn<SheetHandlers['onDelete']>(),
    confirm: vi.fn<SheetHandlers['confirm']>(() => true),
  };
});

afterEach(() => root.remove());

describe('createSheet', () => {
  it('open(null) shows new title and hides delete', () => {
    const sheet = createSheet(root, handlers);
    sheet.open(null);

    expect(root.querySelector('h2')?.textContent).toBe(COPY.sheetNew);
    expect(root.querySelector<HTMLButtonElement>('.del')!.hidden).toBe(true);
    expect(root.querySelector('.sheet')!.classList.contains('open')).toBe(true);
    expect(field('time').type).toBe('time');
  });

  it('open(task) prefills fields and shows delete', () => {
    createSheet(root, handlers).open(TASK);

    expect(root.querySelector('h2')?.textContent).toBe(COPY.sheetEdit);
    expect([field('title').value, field('time').value, field('note').value]).toEqual(['חוג ריקוד', '16:00', 'מים']);
    expect(root.querySelector<HTMLButtonElement>('.del')!.hidden).toBe(false);
  });

  it('submit calls onSave with trimmed draft and editing id, then closes', () => {
    createSheet(root, handlers).open(TASK);
    field('title').value = '  ריקוד  ';
    submit();

    expect(handlers.onSave).toHaveBeenCalledWith({ title: 'ריקוד', time: '16:00', note: 'מים' }, 't1');
    expect(root.querySelector('.sheet')!.classList.contains('open')).toBe(false);
  });

  it('submit for a new task passes null id', () => {
    createSheet(root, handlers).open(null);
    field('title').value = 'לקרוא';
    submit();

    expect(handlers.onSave).toHaveBeenCalledWith({ title: 'לקרוא', time: '', note: '' }, null);
  });

  it('ignores blank title', () => {
    createSheet(root, handlers).open(null);
    field('title').value = '   ';
    submit();

    expect(handlers.onSave).not.toHaveBeenCalled();
    expect(root.querySelector('.sheet')!.classList.contains('open')).toBe(true);
  });

  it('deletes after confirmation', () => {
    createSheet(root, handlers).open(TASK);
    root.querySelector<HTMLButtonElement>('.del')!.click();

    expect(handlers.confirm).toHaveBeenCalledWith(COPY.confirmDelete);
    expect(handlers.onDelete).toHaveBeenCalledWith('t1');
  });

  it('keeps task when delete is not confirmed', () => {
    handlers.confirm = vi.fn<SheetHandlers['confirm']>(() => false);
    createSheet(root, handlers).open(TASK);
    root.querySelector<HTMLButtonElement>('.del')!.click();

    expect(handlers.onDelete).not.toHaveBeenCalled();
  });

  it('scrim click closes', () => {
    createSheet(root, handlers).open(null);
    root.querySelector<HTMLElement>('.scrim')!.click();

    expect(root.querySelector('.sheet')!.classList.contains('open')).toBe(false);
  });
});
