import { CAST_OPTIONS, DEFAULT_PREFS, FONT_OPTIONS, PALETTE_OPTIONS, applyPrefs, parsePrefs } from './prefs';

let target: HTMLElement;
beforeEach(() => { target = document.createElement('html'); });

describe('parsePrefs', () => {
  it('accepts known font, palette and cast ids', () => {
    expect(parsePrefs({ version: 1, font: 'amatic', palette: 'ocean', cast: 'princesses' })).toEqual({ font: 'amatic', palette: 'ocean', cast: 'princesses' });
  });

  it('treats prefs saved before the cast option as animals', () => {
    expect(parsePrefs({ version: 1, font: 'amatic', palette: 'ocean' })).toEqual({ font: 'amatic', palette: 'ocean', cast: 'animals' });
  });

  it('rejects an unknown cast', () => {
    expect(parsePrefs({ version: 1, font: 'amatic', palette: 'ocean', cast: 'robots' })).toBeNull();
  });

  it('rejects unknown ids', () => {
    expect(parsePrefs({ version: 1, font: 'comic-sans', palette: 'ocean' })).toBeNull();
    expect(parsePrefs({ version: 1, font: 'amatic', palette: 'neon' })).toBeNull();
  });
});

describe('options', () => {
  it('offers six fonts and five palettes with the defaults first', () => {
    expect(FONT_OPTIONS.map((option) => option.id)).toEqual(['playpen', 'amatic', 'secular', 'suez', 'karantina', 'varela']);
    expect(PALETTE_OPTIONS.map((option) => option.id)).toEqual(['characters', 'daisy', 'ocean', 'candy', 'forest']);
    expect(CAST_OPTIONS.map((option) => option.id)).toEqual(['animals', 'princesses', 'emotions', 'pooh']);
    expect(DEFAULT_PREFS).toEqual({ font: 'playpen', palette: 'characters', cast: 'animals' });
  });
});

describe('applyPrefs', () => {
  it('sets the display font variables', () => {
    applyPrefs(target, { font: 'amatic', palette: 'characters', cast: 'animals' });

    expect(target.dataset.font).toBe('amatic');
    expect(target.style.getPropertyValue('--font-display')).toContain('Amatic SC');
    expect(Number(target.style.getPropertyValue('--display-scale'))).toBeGreaterThan(1);
  });

  it('sets palette colors and clears them again for character colors', () => {
    applyPrefs(target, { font: 'playpen', palette: 'ocean', cast: 'animals' });
    expect(target.dataset.palette).toBe('ocean');
    expect(target.style.getPropertyValue('--pal-primary')).not.toBe('');

    applyPrefs(target, { font: 'playpen', palette: 'characters', cast: 'animals' });
    expect(target.dataset.palette).toBe('characters');
    expect(target.style.getPropertyValue('--pal-primary')).toBe('');
  });

  it('marks the cast on the root', () => {
    applyPrefs(target, { font: 'playpen', palette: 'characters', cast: 'princesses' });
    expect(target.dataset.cast).toBe('princesses');
  });
});
