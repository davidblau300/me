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
});
