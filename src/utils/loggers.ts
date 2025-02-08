import { ApiRouteType } from '@/utils/constants.ts'

export const logZodError = (error: unknown, route: ApiRouteType) => {
  if (error instanceof Error) {
    console.error(route, error.message)
  }
}
