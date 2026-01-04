import z from 'zod'
import { AuthorSchema } from '@/schema/author.schema'

// 댓글
export const CommentSchema = z
  .object({
    id: z.number(),
    content: z.string(),
    created_at: z.string(),
    author: AuthorSchema,
  })
  .transform((data) => ({
    id: data.id,
    content: data.content,
    createdAt: new Date(data.created_at),
    author: {
      id: data.author.id,
      nickname: data.author.nickname,
      profileImageUrl: data.author.profile_image_url,
      role: data.author.role,
    },
  }))

export type Comment = z.infer<typeof CommentSchema>

// ===============================================================================

// 댓글 등록 요청
export const CommentCreateFormSchema = z.object({
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(500, '내용은 500자 이하로 입력해주세요.'),
})

export type CommentCreateForm = z.infer<typeof CommentCreateFormSchema>

// 댓글 등록 응답
export const CommentCreateResponseSchema = z
  .object({
    comment_id: z.number().int().positive(),
    answer_id: z.number().int().positive(),
    author_id: z.number().int().positive(),
    created_at: z.string(),
  })
  .transform((data) => ({
    id: data.comment_id,
    answerId: data.answer_id,
    authorId: data.author_id,
    createdAt: new Date(data.created_at),
  }))

export type CommentCreateResponse = z.infer<typeof CommentCreateResponseSchema>

// 댓글 수정 요청
export const CommentEditFormSchema = CommentCreateFormSchema
export type CommentEditForm = z.infer<typeof CommentEditFormSchema>

// 댓글 수정 응답
export const CommentEditResponseSchema = CommentSchema
// 응답 타입은 그냥 Comment
