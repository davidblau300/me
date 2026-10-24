import type { CastId } from '../prefs/prefs';
import type { ScreenRoute } from '../router';
import {
  APPLE_FAB_SVG, APPLE_SVG, DAISY_SVG, DUCK_FAB_SVG, DUCK_SVG, FAB_SVG, GOOFY_SVG, MINNIE_SVG, MOUSE_HEAD_SVG, MOUSE_SVG,
  PRINCESS_CAL_FAB_SVG, ROSE_SVG, SHELL_SVG, SLIPPER_SVG, SUN_SVG,
} from './art';

export interface CastArt {
  /** Decoration around the tasks logo: Mickey ears (CSS) or a crown (SVG). */
  logoDecor: 'ears' | 'crown';
  chipMascot: string;
  tasksFab: string;
  calendarMascot: string;
  calendarFab: string;
  weatherMascot: string;
  scheduleMascot: string;
  designMascot: string;
  picker: Record<ScreenRoute, string>;
}

const ANIMALS: CastArt = {
  logoDecor: 'ears',
  chipMascot: MOUSE_SVG,
  tasksFab: FAB_SVG,
  calendarMascot: DUCK_SVG,
  calendarFab: DUCK_FAB_SVG,
  weatherMascot: GOOFY_SVG,
  scheduleMascot: MINNIE_SVG,
  designMascot: DAISY_SVG,
  picker: { tasks: MOUSE_HEAD_SVG, calendar: DUCK_SVG, weather: GOOFY_SVG, schedule: MINNIE_SVG, design: DAISY_SVG },
};

const PRINCESSES: CastArt = {
  logoDecor: 'crown',
  chipMascot: APPLE_SVG,
  tasksFab: APPLE_FAB_SVG,
  calendarMascot: SLIPPER_SVG,
  calendarFab: PRINCESS_CAL_FAB_SVG,
  weatherMascot: SHELL_SVG,
  scheduleMascot: ROSE_SVG,
  designMascot: SUN_SVG,
  picker: { tasks: APPLE_SVG, calendar: SLIPPER_SVG, weather: SHELL_SVG, schedule: ROSE_SVG, design: SUN_SVG },
};

export const CAST_ART: Record<CastId, CastArt> = { animals: ANIMALS, princesses: PRINCESSES };
