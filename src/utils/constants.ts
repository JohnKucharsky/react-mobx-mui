export const apiRoutes = {
  '/users': '/users',
  '/posts': '/posts',
  '/comments': '/comments',
} as const
export type ApiRouteType = keyof typeof apiRoutes
