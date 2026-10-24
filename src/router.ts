export type ScreenRoute = 'tasks' | 'calendar';
export type Route = 'picker' | ScreenRoute;

export const ROUTE_HASH: Record<ScreenRoute, string> = { tasks: '#tasks', calendar: '#calendar' };

export function routeFromHash(hash: string): Route {
  if (hash === ROUTE_HASH.tasks) return 'tasks';
  if (hash === ROUTE_HASH.calendar) return 'calendar';
  return 'picker';
}
