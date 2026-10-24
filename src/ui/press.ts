export const LONG_PRESS_MS = 500;
export const MOVE_TOLERANCE_PX = 10;

export interface PressHandlers {
  onTap: (target: HTMLElement) => void;
  onLongPress: (target: HTMLElement) => void;
}

/** Delegated tap vs long-press on rows; a drag (scroll) beyond the tolerance is neither. */
export function bindPress(element: HTMLElement, handlers: PressHandlers, rowSelector: string): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let startX = 0;
  let startY = 0;
  let suppressClick = false;

  const rowOf = (event: Event): HTMLElement | null =>
    event.target instanceof Element ? event.target.closest<HTMLElement>(rowSelector) : null;

  const cancelTimer = (): void => {
    clearTimeout(timer);
    timer = undefined;
  };

  const onPointerDown = (event: PointerEvent): void => {
    const row = rowOf(event);
    if (!row) return;
    suppressClick = false;
    startX = event.clientX;
    startY = event.clientY;
    cancelTimer();
    timer = setTimeout(() => {
      timer = undefined;
      suppressClick = true;
      handlers.onLongPress(row);
    }, LONG_PRESS_MS);
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (timer === undefined && suppressClick) return;
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > MOVE_TOLERANCE_PX) {
      cancelTimer();
      suppressClick = true;
    }
  };

  const onClick = (event: MouseEvent): void => {
    const row = rowOf(event);
    if (!row) return;
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    handlers.onTap(row);
  };

  const onContextMenu = (event: MouseEvent): void => {
    if (rowOf(event)) event.preventDefault();
  };

  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('pointermove', onPointerMove);
  element.addEventListener('pointerup', cancelTimer);
  element.addEventListener('pointercancel', cancelTimer);
  element.addEventListener('click', onClick);
  element.addEventListener('contextmenu', onContextMenu);

  return () => {
    cancelTimer();
    element.removeEventListener('pointerdown', onPointerDown);
    element.removeEventListener('pointermove', onPointerMove);
    element.removeEventListener('pointerup', cancelTimer);
    element.removeEventListener('pointercancel', cancelTimer);
    element.removeEventListener('click', onClick);
    element.removeEventListener('contextmenu', onContextMenu);
  };
}
