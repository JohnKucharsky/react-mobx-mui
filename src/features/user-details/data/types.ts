import { z } from 'zod'

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})

export type Post = z.infer<typeof PostSchema>

export const CommentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
})

export type CommentType = z.infer<typeof CommentSchema>
