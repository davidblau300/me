import { CAST_ART } from './castArt';

describe('cast art', () => {
  it('keeps picker icons free of the chip-mascot positioning class', () => {
    for (const art of Object.values(CAST_ART)) {
      for (const svg of Object.values(art.picker)) expect(svg).not.toContain('chip-mascot');
    }
  });

  it('gives each screen its princess character', () => {
    const { picker, chipMascot, calendarMascot, weatherMascot, scheduleMascot, designMascot } = CAST_ART.princesses;

    expect(picker).toEqual({ tasks: chipMascot, calendar: calendarMascot, weather: weatherMascot, schedule: scheduleMascot, design: designMascot });
    expect(chipMascot).toContain('class="snow-white"');
    expect(calendarMascot).toContain('class="cinderella"');
    expect(weatherMascot).toContain('class="mermaid"');
    expect(scheduleMascot).toContain('class="belle"');
    expect(designMascot).toContain('class="aurora"');
  });
});
