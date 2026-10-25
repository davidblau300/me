import { CAST_ART } from './castArt';

describe('cast art', () => {
  it('keeps picker icons free of the chip-mascot positioning class', () => {
    for (const art of Object.values(CAST_ART)) {
      for (const svg of Object.values(art.picker)) expect(svg).not.toContain('chip-mascot');
    }
  });

  it('gives each screen its princess character', () => {
    const { picker, chipMascot, calendarMascot, weatherMascot, scheduleMascot, designMascot, recipesMascot } = CAST_ART.princesses;

    expect(picker).toEqual({ tasks: chipMascot, calendar: calendarMascot, weather: weatherMascot, schedule: scheduleMascot, design: designMascot, recipes: recipesMascot });
    expect(chipMascot).toContain('class="snow-white"');
    expect(calendarMascot).toContain('class="cinderella"');
    expect(weatherMascot).toContain('class="mermaid"');
    expect(scheduleMascot).toContain('class="belle"');
    expect(designMascot).toContain('class="aurora"');
    expect(recipesMascot).toContain('class="rapunzel"');
  });

  it('gives each screen its emotion character', () => {
    const { picker, chipMascot, calendarMascot, weatherMascot, scheduleMascot, designMascot, recipesMascot, logoDecor } = CAST_ART.emotions;

    expect(picker).toEqual({ tasks: chipMascot, calendar: calendarMascot, weather: weatherMascot, schedule: scheduleMascot, design: designMascot, recipes: recipesMascot });
    expect(chipMascot).toContain('class="joy"');
    expect(calendarMascot).toContain('class="fear"');
    expect(weatherMascot).toContain('class="sadness"');
    expect(scheduleMascot).toContain('class="anger"');
    expect(recipesMascot).toContain('class="disgust"');
    expect(designMascot).toContain('class="envy"');
    expect(logoDecor).toBe('orbs');
  });

  it('gives each screen its Hundred Acre Wood character', () => {
    const { picker, chipMascot, calendarMascot, weatherMascot, scheduleMascot, designMascot, recipesMascot, logoDecor } = CAST_ART.pooh;

    expect(picker).toEqual({ tasks: chipMascot, calendar: calendarMascot, weather: weatherMascot, schedule: scheduleMascot, design: designMascot, recipes: recipesMascot });
    expect(chipMascot).toContain('class="pooh"');
    expect(calendarMascot).toContain('class="piglet"');
    expect(weatherMascot).toContain('class="eeyore"');
    expect(scheduleMascot).toContain('class="owl"');
    expect(designMascot).toContain('class="tigger"');
    expect(recipesMascot).toContain('class="rabbit"');
    expect(logoDecor).toBe('honey');
  });

  it('gives each screen its Smurf', () => {
    const { picker, chipMascot, calendarMascot, weatherMascot, scheduleMascot, designMascot, recipesMascot, logoDecor } = CAST_ART.smurfs;

    expect(picker).toEqual({ tasks: chipMascot, calendar: calendarMascot, weather: weatherMascot, schedule: scheduleMascot, design: designMascot, recipes: recipesMascot });
    expect(chipMascot).toContain('class="smurfette"');
    expect(calendarMascot).toContain('class="papa-smurf"');
    expect(weatherMascot).toContain('class="hefty-smurf"');
    expect(scheduleMascot).toContain('class="brainy-smurf"');
    expect(designMascot).toContain('class="painter-smurf"');
    expect(recipesMascot).toContain('class="chef-smurf"');
    expect(logoDecor).toBe('cap');
  });

  it("gives each screen its own bow tie, with no characters", () => {
    const { picker, chipMascot, calendarMascot, weatherMascot, scheduleMascot, designMascot, recipesMascot, logoDecor } = CAST_ART.bowties;

    expect(picker).toEqual({ tasks: chipMascot, calendar: calendarMascot, weather: weatherMascot, schedule: scheduleMascot, design: designMascot, recipes: recipesMascot });
    expect(chipMascot).toContain('class="bow-polka"');
    expect(calendarMascot).toContain('class="bow-stars"');
    expect(weatherMascot).toContain('class="bow-stripes"');
    expect(scheduleMascot).toContain('class="bow-gingham"');
    expect(designMascot).toContain('class="bow-rainbow"');
    expect(recipesMascot).toContain('class="bow-hearts"');
    expect(logoDecor).toBe('bowtie');
  });
});
