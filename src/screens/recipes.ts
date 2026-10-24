import type { AppDeps, Mounted } from '../deps';
import { RECIPES, type Recipe } from '../recipes/recipes';
import { loadPrefs } from '../storage/prefsStore';
import { backButton } from '../ui/back';
import { CAST_ART } from '../ui/castArt';
import { COPY } from '../ui/copy';

interface RecipeHistoryState {
  recipe: string;
}

export function mountRecipes(root: HTMLElement, deps: AppDeps, onBack: () => void): Mounted {
  let open: Recipe | null = null;
  let gotIngredients = new Set<number>();

  const app = document.createElement('div');
  app.className = 'app recipes-theme';
  app.dataset.screen = 'recipes';

  const head = document.createElement('header');
  head.className = 'head recipes-head';
  const logo = text('span', 'logo', 'me');
  const mascot = text('span', 'mascot');
  mascot.innerHTML = CAST_ART[loadPrefs(deps.storage).cast].recipesMascot;
  // Inside a recipe, back pops the entry we pushed (same as Android back); on the list it leaves the screen.
  head.append(backButton(() => (open ? history.back() : onBack())), logo, mascot);

  const body = document.createElement('main');
  body.className = 'feed recipes-body';
  app.append(head, body);
  root.replaceChildren(app);

  const renderList = (): void => {
    const cards = RECIPES.map((recipe) => {
      const card = text('button', 'recipe-card') as HTMLButtonElement;
      card.type = 'button';
      card.dataset.recipe = recipe.id;
      card.append(text('span', 'recipe-title', recipe.title), text('span', 'recipe-meta', `${recipe.time} · ${recipe.yield}`));
      card.addEventListener('click', () => showRecipe(recipe));
      return card;
    });
    body.replaceChildren(text('h2', 'recipes-title', COPY.recipesTitle), ...cards);
    body.scrollTop = 0;
  };

  const renderRecipe = (recipe: Recipe): void => {
    const ingredients = text('ul', 'ingredients');
    ingredients.append(...recipe.ingredients.map((ingredient, index) => {
      const item = text('li', '');
      const button = text('button', 'ingredient', ingredient) as HTMLButtonElement;
      button.type = 'button';
      button.classList.toggle('got', gotIngredients.has(index));
      button.addEventListener('click', () => {
        if (gotIngredients.has(index)) gotIngredients.delete(index);
        else gotIngredients.add(index);
        renderRecipe(recipe);
      });
      item.append(button);
      return item;
    }));

    const steps = text('ol', 'steps');
    steps.append(...recipe.steps.map((step) => {
      const item = text('li', 'step');
      item.append(text('span', 'step-text', step.text));
      if (step.withAdult) item.append(text('span', 'adult-badge', COPY.withAdult));
      return item;
    }));

    body.replaceChildren(
      text('h2', 'recipe-detail-title', recipe.title),
      text('p', 'recipe-meta', `${recipe.time} · ${recipe.yield}`),
      text('h3', 'recipe-section', COPY.ingredients),
      text('p', 'recipe-hint', COPY.ingredientsHint),
      ingredients,
      text('h3', 'recipe-section', COPY.steps),
      steps,
    );
  };

  const showRecipe = (recipe: Recipe): void => {
    open = recipe;
    gotIngredients = new Set();
    const state: RecipeHistoryState = { recipe: recipe.id };
    history.pushState(state, '', location.href);
    renderRecipe(recipe);
    body.scrollTop = 0;
  };

  const onPopState = (): void => {
    if (!open) return;
    open = null;
    renderList();
  };
  window.addEventListener('popstate', onPopState);

  renderList();

  return {
    stop() {
      window.removeEventListener('popstate', onPopState);
    },
  };
}

function text(tag: string, className: string, content?: string): HTMLElement {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
