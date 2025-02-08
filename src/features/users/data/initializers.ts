import { createEvent, sample } from 'effector'
import { getUsersFx } from '@/features/users/data/api'

export const usersStarted = createEvent()

sample({
  clock: usersStarted,
  fn: () => ({}),
  target: getUsersFx,
})
