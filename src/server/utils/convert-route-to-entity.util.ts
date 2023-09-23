const mapping: Record<string, string> = {
  insights: 'insight',
  poets: 'poet',
  publishers: 'publisher',
  quotes: 'quote',
  subscribers: 'subscriber',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
