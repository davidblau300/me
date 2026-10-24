import type { AppDeps, Mounted } from '../deps';
import { CAST_OPTIONS, DEFAULT_PREFS, FONT_OPTIONS, PALETTE_OPTIONS, applyPrefs, type Prefs } from '../prefs/prefs';
import { loadPrefs, savePrefs } from '../storage/prefsStore';
import { CAST_ART } from '../ui/castArt';
import { backButton } from '../ui/back';
import { COPY } from '../ui/copy';

export function mountDesign(root: HTMLElement, deps: AppDeps, onBack: () => void): Mounted {
  let prefs: Prefs = loadPrefs(deps.storage);

  const app = document.createElement('div');
  app.className = 'app daisy-theme';
  app.dataset.screen = 'design';

  const head = document.createElement('header');
  head.className = 'head design-head';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'me';
  const mascot = document.createElement('span');
  mascot.className = 'mascot';
  head.append(backButton(onBack), logo, mascot);

  const body = document.createElement('main');
  body.className = 'feed design-body';
  app.append(head, body);
  root.replaceChildren(app);

  const choose = (next: Prefs): void => {
    prefs = next;
    applyPrefs(document.documentElement, prefs);
    savePrefs(deps.storage, prefs);
    render();
  };

  const render = (): void => {
    mascot.innerHTML = CAST_ART[prefs.cast].designMascot;

    const casts = CAST_OPTIONS.map((cast) => {
      const button = optionButton('cast-option', cast.id === prefs.cast);
      button.dataset.cast = cast.id;
      const preview = text('span', 'cast-preview');
      preview.innerHTML = CAST_ART[cast.id].picker.tasks + CAST_ART[cast.id].picker.calendar + CAST_ART[cast.id].picker.schedule;
      button.append(preview, text('span', 'option-label', cast.label));
      button.addEventListener('click', () => choose({ ...prefs, cast: cast.id }));
      return button;
    });

    const fonts = FONT_OPTIONS.map((font) => {
      const button = optionButton('font-option', font.id === prefs.font);
      button.dataset.font = font.id;
      const sample = text('span', 'font-sample', COPY.designSample);
      sample.style.fontFamily = font.family;
      sample.style.fontWeight = String(font.weight);
      sample.style.fontSize = `calc(20px * ${font.scale})`;
      button.append(sample, text('span', 'option-label', font.label));
      button.addEventListener('click', () => choose({ ...prefs, font: font.id }));
      return button;
    });

    const palettes = PALETTE_OPTIONS.map((palette) => {
      const button = optionButton('palette-option', palette.id === prefs.palette);
      button.dataset.palette = palette.id;
      const swatch = text('span', 'swatch');
      swatch.append(...palette.swatch.map((color) => {
        const dot = text('span', 'swatch-dot');
        dot.style.background = color;
        return dot;
      }));
      button.append(swatch, text('span', 'option-label', palette.label));
      button.addEventListener('click', () => choose({ ...prefs, palette: palette.id }));
      return button;
    });

    const reset = text('button', 'reset', COPY.designReset) as HTMLButtonElement;
    reset.type = 'button';
    reset.addEventListener('click', () => choose(DEFAULT_PREFS));

    body.replaceChildren(
      text('h2', 'design-title', COPY.designTitle),
      text('h3', 'design-section', COPY.designCast), grid('cast-options', casts),
      text('h3', 'design-section', COPY.designFont), grid('font-options', fonts),
      text('h3', 'design-section', COPY.designColors), grid('palette-options', palettes),
      reset,
    );
  };

  render();
  return { stop() {} };
}

function optionButton(className: string, isOn: boolean): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.classList.toggle('on', isOn);
  button.setAttribute('aria-pressed', String(isOn));
  return button;
}

function grid(className: string, children: HTMLElement[]): HTMLElement {
  const node = text('div', className);
  node.append(...children);
  return node;
}

function text(tag: string, className: string, content?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
