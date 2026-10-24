import { CAST_ART } from './castArt';

describe('cast art', () => {
  it('keeps picker icons free of the chip-mascot positioning class', () => {
    for (const art of Object.values(CAST_ART)) {
      for (const svg of Object.values(art.picker)) expect(svg).not.toContain('chip-mascot');
    }
  });
});
