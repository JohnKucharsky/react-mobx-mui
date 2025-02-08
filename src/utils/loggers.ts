import { Effect } from 'effector'
import { ApiRouteType } from '@/utils/constants.ts'

export const logZodError = (error: unknown, route: ApiRouteType) => {
  if (error instanceof Error) {
    console.error(route, error.message)
  }
}

export const logEffectError = (
  route: ApiRouteType,
  effect: Effect<any, any, Error>,
) => {
  effect.failData.map((err) => console.error('effect', route, err))
}
