import { createEvent, sample } from 'effector'
import { getCommentsFx, getUserFx } from '@/features/user-details/data/api.ts'

export const userDetailedStarted = createEvent<string | undefined>()

sample({
  clock: userDetailedStarted,
  fn: (id) => ({ id }),
  target: getUserFx,
})

sample({ clock: userDetailedStarted, target: getCommentsFx })
