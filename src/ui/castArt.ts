import type { CastId } from '../prefs/prefs';
import type { ScreenRoute } from '../router';
import {
  ANGER_SVG, APPLE_FAB_SVG, AURORA_SVG, BALLOON_FAB_SVG, BELLE_SVG, CINDERELLA_SVG, DAISY_SVG, DISGUST_SVG, DUCK_FAB_SVG, DUCK_SVG,
  EEYORE_SVG, ENVY_SVG, FAB_SVG, FEAR_ORB_FAB_SVG, FEAR_SVG, GOOFY_SVG, HONEY_POT_FAB_SVG, JOY_ORB_FAB_SVG, JOY_SVG, MERMAID_SVG,
  MINNIE_SVG, MOUSE_HEAD_SVG, MOUSE_SVG, OWL_SVG, PIGLET_SVG, PLUTO_SVG, POOH_SVG, PRINCESS_CAL_FAB_SVG, RABBIT_SVG, RAPUNZEL_SVG,
  SADNESS_SVG, SNOW_WHITE_SVG, TIGGER_SVG,
  BOW_TIE_FAB_SVG, BRAINY_SMURF_SVG, CHEF_SMURF_SVG, GIFT_FAB_SVG, GINGHAM_BOW_SVG, HEART_BOW_SVG, HEFTY_SMURF_SVG,
  MUSHROOM_FAB_SVG, PAINTER_SMURF_SVG, PAPA_SMURF_SVG, POLKA_BOW_SVG, RAINBOW_BOW_SVG, SMURFBERRY_FAB_SVG, SMURFETTE_SVG,
  STAR_BOW_SVG, STRIPE_BOW_SVG,
} from './art';

export interface CastArt {
  /** Decoration around the tasks logo: Mickey ears (CSS), a crown, memory orbs, a honey pot, a Smurf cap or a bow tie (SVG). */
  logoDecor: 'ears' | 'crown' | 'orbs' | 'honey' | 'cap' | 'bowtie';
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

const POOH: CastArt = {
  logoDecor: 'honey',
  chipMascot: POOH_SVG,
  tasksFab: HONEY_POT_FAB_SVG,
  calendarMascot: PIGLET_SVG,
  calendarFab: BALLOON_FAB_SVG,
  weatherMascot: EEYORE_SVG,
  scheduleMascot: OWL_SVG,
  designMascot: TIGGER_SVG,
  recipesMascot: RABBIT_SVG,
  picker: { tasks: POOH_SVG, calendar: PIGLET_SVG, weather: EEYORE_SVG, schedule: OWL_SVG, design: TIGGER_SVG, recipes: RABBIT_SVG },
};

const SMURFS: CastArt = {
  logoDecor: 'cap',
  chipMascot: SMURFETTE_SVG,
  tasksFab: MUSHROOM_FAB_SVG,
  calendarMascot: PAPA_SMURF_SVG,
  calendarFab: SMURFBERRY_FAB_SVG,
  weatherMascot: HEFTY_SMURF_SVG,
  scheduleMascot: BRAINY_SMURF_SVG,
  designMascot: PAINTER_SMURF_SVG,
  recipesMascot: CHEF_SMURF_SVG,
  picker: {
    tasks: SMURFETTE_SVG, calendar: PAPA_SMURF_SVG, weather: HEFTY_SMURF_SVG,
    schedule: BRAINY_SMURF_SVG, design: PAINTER_SMURF_SVG, recipes: CHEF_SMURF_SVG,
  },
};

const BOWTIES: CastArt = {
  logoDecor: 'bowtie',
  chipMascot: POLKA_BOW_SVG,
  tasksFab: BOW_TIE_FAB_SVG,
  calendarMascot: STAR_BOW_SVG,
  calendarFab: GIFT_FAB_SVG,
  weatherMascot: STRIPE_BOW_SVG,
  scheduleMascot: GINGHAM_BOW_SVG,
  designMascot: RAINBOW_BOW_SVG,
  recipesMascot: HEART_BOW_SVG,
  picker: {
    tasks: POLKA_BOW_SVG, calendar: STAR_BOW_SVG, weather: STRIPE_BOW_SVG,
    schedule: GINGHAM_BOW_SVG, design: RAINBOW_BOW_SVG, recipes: HEART_BOW_SVG,
  },
};

export const CAST_ART: Record<CastId, CastArt> = {
  animals: ANIMALS, princesses: PRINCESSES, emotions: EMOTIONS, pooh: POOH, smurfs: SMURFS, bowties: BOWTIES,
};
