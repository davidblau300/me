import { BACK_ICON_SVG } from './art';
import { COPY } from './copy';

export function backButton(onBack: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back';
  button.setAttribute('aria-label', COPY.back);
  button.innerHTML = BACK_ICON_SVG;
  button.addEventListener('click', onBack);
  return button;
}
