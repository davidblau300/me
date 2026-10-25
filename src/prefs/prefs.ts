import { isRecord } from '../storage/safeStorage';

interface FontOption {
  readonly id: string;
  readonly label: string;
  readonly family: string;
  /** Some display fonts draw small or narrow; scale them to match the default's visual size. */
  readonly scale: number;
  readonly weight: number;
}

interface PaletteColors {
  readonly bg: string;
  readonly dot: string;
  readonly ink: string;
  readonly muted: string;
  readonly primary: string;
  readonly accent: string;
  readonly accent2: string;
  readonly accent2Edge: string;
  readonly tint: string;
}

interface PaletteOption {
  readonly id: string;
  readonly label: string;
  /** Null keeps each screen's own character colors. */
  readonly colors: PaletteColors | null;
  readonly swatch: readonly string[];
}

export const FONT_OPTIONS = [
  { id: 'playpen', label: 'כתב יד', family: "'Playpen Sans Hebrew', cursive", scale: 1, weight: 500 },
  { id: 'amatic', label: 'טוש', family: "'Amatic SC', cursive", scale: 1.4, weight: 700 },
  { id: 'secular', label: 'עגול ועבה', family: "'Secular One', sans-serif", scale: 1, weight: 400 },
  { id: 'suez', label: 'קלאסי', family: "'Suez One', serif", scale: 1, weight: 400 },
  { id: 'karantina', label: 'גבוה וצר', family: "'Karantina', sans-serif", scale: 1.35, weight: 700 },
  { id: 'varela', label: 'פשוט', family: "'Varela Round', sans-serif", scale: 1, weight: 400 },
] as const satisfies readonly FontOption[];

export const PALETTE_OPTIONS = [
  { id: 'characters', label: 'דמויות', colors: null, swatch: ['#e3191b', '#2f6fd6', '#f47b20', '#e8318a'] },
  {
    id: 'daisy', label: 'דייזי', swatch: ['#f4ecff', '#6a3fb5', '#ff6fb0', '#ffc94d'],
    colors: { bg: '#f4ecff', dot: '#e4d3ff', ink: '#2c1a4a', muted: '#5c4a75', primary: '#6a3fb5', accent: '#ff6fb0', accent2: '#ffc94d', accent2Edge: '#e0a92a', tint: '#ffe6f2' },
  },
  {
    id: 'ocean', label: 'ים', swatch: ['#e6f7f7', '#0f6e78', '#1fb5b5', '#ff9f7a'],
    colors: { bg: '#e6f7f7', dot: '#c5ecec', ink: '#0b3a40', muted: '#3f6468', primary: '#0f6e78', accent: '#1fb5b5', accent2: '#ff9f7a', accent2Edge: '#e57f58', tint: '#d4f3f0' },
  },
  {
    id: 'candy', label: 'סוכריה', swatch: ['#fff0f7', '#d6336c', '#8f5cff', '#ffd43b'],
    colors: { bg: '#fff0f7', dot: '#ffd6ea', ink: '#3b1830', muted: '#6e4a60', primary: '#d6336c', accent: '#8f5cff', accent2: '#ffd43b', accent2Edge: '#e6b800', tint: '#fff3c4' },
  },
  {
    id: 'forest', label: 'יער', swatch: ['#eef7e8', '#2f6b2f', '#7cb342', '#f2a541'],
    colors: { bg: '#eef7e8', dot: '#d6ecc8', ink: '#1e3a1e', muted: '#4b604b', primary: '#2f6b2f', accent: '#7cb342', accent2: '#f2a541', accent2Edge: '#d1861f', tint: '#fbecc9' },
  },
] as const satisfies readonly PaletteOption[];

/** Which cartoon world decorates the screens: original animal-, princess-, emotion-, Pooh- or Smurf-inspired art, or plain bow ties. */
export const CAST_OPTIONS = [
  { id: 'animals', label: 'חיות מצוירות' },
  { id: 'princesses', label: 'נסיכות' },
  { id: 'emotions', label: 'רגשות' },
  { id: 'pooh', label: 'פו הדב' },
  { id: 'smurfs', label: 'דרדסים' },
  { id: 'bowties', label: 'פפיונים' },
] as const satisfies ReadonlyArray<{ readonly id: string; readonly label: string }>;

export type FontId = (typeof FONT_OPTIONS)[number]['id'];
export type PaletteId = (typeof PALETTE_OPTIONS)[number]['id'];
export type CastId = (typeof CAST_OPTIONS)[number]['id'];

export interface Prefs {
  font: FontId;
  palette: PaletteId;
  cast: CastId;
}

export const DEFAULT_PREFS: Prefs = { font: 'playpen', palette: 'characters', cast: 'animals' };

const PALETTE_VARIABLES: ReadonlyArray<[keyof PaletteColors, string]> = [
  ['bg', '--pal-bg'], ['dot', '--pal-dot'], ['ink', '--pal-ink'], ['muted', '--pal-muted'], ['primary', '--pal-primary'],
  ['accent', '--pal-accent'], ['accent2', '--pal-accent-2'], ['accent2Edge', '--pal-accent-2-edge'], ['tint', '--pal-tint'],
];

export function parsePrefs(value: unknown): Prefs | null {
  if (!isRecord(value) || value.version !== 1) return null;
  const font = FONT_OPTIONS.find((option) => option.id === value.font);
  const palette = PALETTE_OPTIONS.find((option) => option.id === value.palette);
  // Prefs saved before the cast option existed have no `cast`; they keep the original animals.
  const cast = value.cast === undefined ? CAST_OPTIONS[0] : CAST_OPTIONS.find((option) => option.id === value.cast);
  return font && palette && cast ? { font: font.id, palette: palette.id, cast: cast.id } : null;
}

/** Fonts and palettes are CSS variables on the root; each screen's character colors are the fallback. */
export function applyPrefs(target: HTMLElement, prefs: Prefs): void {
  const font = FONT_OPTIONS.find((option) => option.id === prefs.font) ?? FONT_OPTIONS[0];
  target.dataset.font = font.id;
  target.style.setProperty('--font-display', font.family);
  target.style.setProperty('--display-scale', String(font.scale));
  target.style.setProperty('--display-weight', String(font.weight));

  target.dataset.cast = prefs.cast;

  const palette: PaletteOption = PALETTE_OPTIONS.find((option) => option.id === prefs.palette) ?? PALETTE_OPTIONS[0];
  target.dataset.palette = palette.id;
  for (const [key, variable] of PALETTE_VARIABLES) {
    if (palette.colors) target.style.setProperty(variable, palette.colors[key]);
    else target.style.removeProperty(variable);
  }
}
