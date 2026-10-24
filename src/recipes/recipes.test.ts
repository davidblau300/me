import { RECIPES } from './recipes';

describe('RECIPES', () => {
  it('has the five requested recipes in order', () => {
    expect(RECIPES.map((recipe) => recipe.id)).toEqual(['cookies', 'vanilla-cake', 'pizza', 'cupcakes', 'chocolate-balls']);
    expect(RECIPES.map((recipe) => recipe.title)).toEqual(['עוגיות שוקולד צ׳יפס', 'עוגת וניל', 'פיצה', 'קאפקייקס', 'כדורי שוקולד']);
  });

  it('gives every recipe enough ingredients and steps', () => {
    for (const recipe of RECIPES) {
      expect(recipe.ingredients.length).toBeGreaterThanOrEqual(5);
      expect(recipe.steps.length).toBeGreaterThanOrEqual(5);
      expect(recipe.time).not.toBe('');
      expect(recipe.yield).not.toBe('');
    }
  });

  it('marks every oven, stove or knife step as needing an adult', () => {
    for (const recipe of RECIPES) {
      for (const step of recipe.steps) {
        const risky = /תנור|אש|סכין|אופים/.test(step.text);
        if (risky) expect(step.withAdult, `${recipe.id}: ${step.text}`).toBe(true);
      }
      expect(recipe.steps.some((step) => step.withAdult)).toBe(true);
    }
  });
});
