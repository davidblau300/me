import type { Mounted } from '../deps';
import type { ScreenRoute } from '../router';
import type { CastArt } from '../ui/castArt';
import { COPY } from '../ui/copy';

export function mountPicker(root: HTMLElement, onPick: (route: ScreenRoute) => void, art: CastArt): Mounted {
  const app = document.createElement('div');
  app.className = 'app picker';
  app.dataset.screen = 'picker';

  const logo = document.createElement('div');
  logo.className = 'logo picker-logo';
  logo.textContent = 'me';

  const title = document.createElement('h1');
  title.className = 'picker-title';
  title.textContent = COPY.pickerTitle;

  const choices = document.createElement('div');
  choices.className = 'choices';
  choices.append(
    choice('tasks', COPY.routeTasks, art.picker.tasks, onPick),
    choice('calendar', COPY.routeCalendar, art.picker.calendar, onPick),
    choice('weather', COPY.routeWeather, art.picker.weather, onPick),
    choice('schedule', COPY.routeSchedule, art.picker.schedule, onPick),
    choice('design', COPY.routeDesign, art.picker.design, onPick),
  );

  app.append(logo, title, choices);
  root.replaceChildren(app);
  return { stop() {} };
}

function choice(route: ScreenRoute, label: string, art: string, onPick: (route: ScreenRoute) => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `pick pick-${route}`;
  button.dataset.route = route;
  const icon = document.createElement('span');
  icon.className = 'pick-art';
  icon.innerHTML = art;
  const text = document.createElement('span');
  text.className = 'pick-label';
  text.textContent = label;
  button.append(icon, text);
  button.addEventListener('click', () => onPick(route));
  return button;
}
