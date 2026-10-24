import type { CastId } from '../prefs/prefs';
import type { ScreenRoute } from '../router';
import {
  ANGER_SVG, APPLE_FAB_SVG, AURORA_SVG, BELLE_SVG, CINDERELLA_SVG, DAISY_SVG, DISGUST_SVG, DUCK_FAB_SVG, DUCK_SVG, ENVY_SVG,
  FAB_SVG, FEAR_ORB_FAB_SVG, FEAR_SVG, GOOFY_SVG, JOY_ORB_FAB_SVG, JOY_SVG, MERMAID_SVG, SADNESS_SVG,
  MINNIE_SVG, MOUSE_HEAD_SVG, MOUSE_SVG, PLUTO_SVG, PRINCESS_CAL_FAB_SVG, RAPUNZEL_SVG, SNOW_WHITE_SVG,
} from './art';

export interface CastArt {
  /** Decoration around the tasks logo: Mickey ears (CSS), a crown or memory orbs (SVG). */
  logoDecor: 'ears' | 'crown' | 'orbs';
  chipMascot: string;
  tasksFab: string;
  calendarMascot: string;
  calendarFab: string;
  weatherMascot: string;
  scheduleMascot: string;
  designMascot: string;
  recipesMascot: string;
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
  recipesMascot: PLUTO_SVG,
  picker: { tasks: MOUSE_HEAD_SVG, calendar: DUCK_SVG, weather: GOOFY_SVG, schedule: MINNIE_SVG, design: DAISY_SVG, recipes: PLUTO_SVG },
};

const PRINCESSES: CastArt = {
  logoDecor: 'crown',
  chipMascot: SNOW_WHITE_SVG,
  tasksFab: APPLE_FAB_SVG,
  calendarMascot: CINDERELLA_SVG,
  calendarFab: PRINCESS_CAL_FAB_SVG,
  weatherMascot: MERMAID_SVG,
  scheduleMascot: BELLE_SVG,
  designMascot: AURORA_SVG,
  recipesMascot: RAPUNZEL_SVG,
  picker: { tasks: SNOW_WHITE_SVG, calendar: CINDERELLA_SVG, weather: MERMAID_SVG, schedule: BELLE_SVG, design: AURORA_SVG, recipes: RAPUNZEL_SVG },
};

const EMOTIONS: CastArt = {
  logoDecor: 'orbs',
  chipMascot: JOY_SVG,
  tasksFab: JOY_ORB_FAB_SVG,
  calendarMascot: FEAR_SVG,
  calendarFab: FEAR_ORB_FAB_SVG,
  weatherMascot: SADNESS_SVG,
  scheduleMascot: ANGER_SVG,
  designMascot: ENVY_SVG,
  recipesMascot: DISGUST_SVG,
  picker: { tasks: JOY_SVG, calendar: FEAR_SVG, weather: SADNESS_SVG, schedule: ANGER_SVG, design: ENVY_SVG, recipes: DISGUST_SVG },
};

export const CAST_ART: Record<CastId, CastArt> = { animals: ANIMALS, princesses: PRINCESSES, emotions: EMOTIONS };
