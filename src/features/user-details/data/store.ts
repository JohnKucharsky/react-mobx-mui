import { action, flow, observable, runInAction } from 'mobx'
import { z } from 'zod'
import { GeneratorT } from '@/@types/mobx.ts'
import {
  CommentType,
  CommentSchema,
  Post,
  PostSchema,
} from '@/features/user-details/data/types.ts'
import { type User, UserSchema } from '@/features/users/data/types.ts'
import { axiosInstance } from '@/utils/axios'
import { apiRoutes } from '@/utils/constants.ts'
import { groupBy } from '@/utils/helpers.ts'
import { logZodError } from '@/utils/loggers.ts'

export class UserDetailsStore {
  @observable accessor user: {
    user: User
    posts: Post[]
  } | null = null
  @observable accessor userLoading: boolean = false

  @observable accessor comments: Record<string, CommentType[]> | null = null
  @observable accessor commentLoading: boolean = false;

  // @ts-expect-error
  @flow
  *fetchComments(): GeneratorT<CommentType[]> {
    this.commentLoading = true
    try {
      const res = yield axiosInstance.get<CommentType[]>(apiRoutes['/comments'])
      z.array(CommentSchema).parse(res.data)

      this.comments = groupBy(res.data, (comment) => comment.postId)
    } catch (e) {
      logZodError(e, apiRoutes['/comments'])
    } finally {
      this.commentLoading = false
    }
  }

  @action
  async fetchUser({ id }: { id?: string }) {
    try {
      this.userLoading = true
      const resUser = await axiosInstance.get<User[]>(apiRoutes['/users'], {
        params: {
          id: id || undefined,
        },
      })
      z.array(UserSchema).parse(resUser.data)

      if (resUser.data.length === 0) {
        return
      }

      const resPosts = await axiosInstance.get<Post[]>(apiRoutes['/posts'], {
        params: {
          userId: resUser.data[0].id,
        },
      })
      z.array(PostSchema).parse(resPosts.data)

      runInAction(() => {
        this.user = {
          user: resUser.data[0],
          posts: resPosts.data,
        }
      })
    } catch (e) {
      logZodError(e, apiRoutes['/users'])
    } finally {
      runInAction(() => {
        this.userLoading = false
      })
    }
  }
}

export const userDetailsStore = new UserDetailsStore()
