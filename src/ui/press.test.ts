import type { Mock } from 'vitest';
import { LONG_PRESS_MS, MOVE_TOLERANCE_PX, bindPress } from './press';

let list: HTMLElement;
let row: HTMLElement;
type RowHandler = (target: HTMLElement) => void;
let onTap: Mock<RowHandler>;
let onLongPress: Mock<RowHandler>;
let unbind: () => void;

function pointer(type: string, clientX = 0, clientY = 0): void {
  row.dispatchEvent(new PointerEvent(type, { bubbles: true, clientX, clientY }));
}

beforeEach(() => {
  vi.useFakeTimers();
  list = document.createElement('div');
  row = document.createElement('div');
  row.className = 'row';
  row.append(document.createElement('span'));
  list.append(row);
  document.body.append(list);
  onTap = vi.fn<RowHandler>();
  onLongPress = vi.fn<RowHandler>();
  unbind = bindPress(list, { onTap, onLongPress }, '.row');
});

afterEach(() => {
  unbind();
  list.remove();
  vi.useRealTimers();
});

describe('bindPress', () => {
  it('tap calls onTap once with the row', () => {
    pointer('pointerdown');
    pointer('pointerup');
    row.firstElementChild!.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onTap).toHaveBeenCalledTimes(1);
    expect(onTap).toHaveBeenCalledWith(row);
    expect(onLongPress).not.toHaveBeenCalled();
  });

  it('holding 500ms calls onLongPress and suppresses the following click', () => {
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_MS);
    pointer('pointerup');
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onLongPress).toHaveBeenCalledWith(row);
    expect(onTap).not.toHaveBeenCalled();
  });

  it('pointer move beyond threshold cancels long press and tap', () => {
    pointer('pointerdown', 0, 0);
    pointer('pointermove', 0, MOVE_TOLERANCE_PX + 1);
    vi.advanceTimersByTime(LONG_PRESS_MS);
    pointer('pointerup', 0, MOVE_TOLERANCE_PX + 1);
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onTap).not.toHaveBeenCalled();
  });

  it('small jitter still counts as a tap', () => {
    pointer('pointerdown', 0, 0);
    pointer('pointermove', 3, 3);
    pointer('pointerup', 3, 3);
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onTap).toHaveBeenCalledTimes(1);
  });

  it('prevents the context menu on rows', () => {
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    row.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('ignores clicks outside rows', () => {
    list.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onTap).not.toHaveBeenCalled();
  });
});
