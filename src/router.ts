export type ScreenRoute = 'tasks' | 'calendar' | 'weather' | 'schedule' | 'design';
export type Route = 'picker' | ScreenRoute;

export const ROUTE_HASH: Record<ScreenRoute, string> = { tasks: '#tasks', calendar: '#calendar', weather: '#weather', schedule: '#schedule', design: '#design' };

export function routeFromHash(hash: string): Route {
  const match = (Object.keys(ROUTE_HASH) as ScreenRoute[]).find((route) => ROUTE_HASH[route] === hash);
  return match ?? 'picker';
}
