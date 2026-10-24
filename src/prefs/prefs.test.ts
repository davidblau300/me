import { DEFAULT_PREFS, FONT_OPTIONS, PALETTE_OPTIONS, applyPrefs, parsePrefs } from './prefs';

let target: HTMLElement;
beforeEach(() => { target = document.createElement('html'); });

describe('parsePrefs', () => {
  it('accepts known font and palette ids', () => {
    expect(parsePrefs({ version: 1, font: 'amatic', palette: 'ocean' })).toEqual({ font: 'amatic', palette: 'ocean' });
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
    expect(DEFAULT_PREFS).toEqual({ font: 'playpen', palette: 'characters' });
  });
});

describe('applyPrefs', () => {
  it('sets the display font variables', () => {
    applyPrefs(target, { font: 'amatic', palette: 'characters' });

    expect(target.dataset.font).toBe('amatic');
    expect(target.style.getPropertyValue('--font-display')).toContain('Amatic SC');
    expect(Number(target.style.getPropertyValue('--display-scale'))).toBeGreaterThan(1);
  });

  it('sets palette colors and clears them again for character colors', () => {
    applyPrefs(target, { font: 'playpen', palette: 'ocean' });
    expect(target.dataset.palette).toBe('ocean');
    expect(target.style.getPropertyValue('--pal-primary')).not.toBe('');

    applyPrefs(target, { font: 'playpen', palette: 'characters' });
    expect(target.dataset.palette).toBe('characters');
    expect(target.style.getPropertyValue('--pal-primary')).toBe('');
  });
});
