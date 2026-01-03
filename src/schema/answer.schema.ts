import z from 'zod'
import { CommentSchema } from '@/schema/comment.schema'
import { AuthorSchema } from '@/schema/author.schema'

// 답변
export const AnswerSchema = z
  .object({
    id: z.number(),
    content: z.string(),
    created_at: z.string(),
    is_adopted: z.boolean(),
    author: AuthorSchema,
    comments: z.array(CommentSchema),
    preview_comments: z.array(CommentSchema).optional(),
    total_comments_count: z.number().optional(),
  })
  .transform((data) => ({
    id: data.id,
    content: data.content,
    createdAt: new Date(data.created_at),
    isAdopted: data.is_adopted,
    author: {
      id: data.author.id,
      nickname: data.author.nickname,
      profileImageUrl: data.author.profile_image_url,
      role: data.author.role,
    },
    comments: data.comments,
    previewComments: data.preview_comments,
    totalCommentsCount: data.total_comments_count,
  }))

export type Answer = z.infer<typeof AnswerSchema>

// ===============================================================================

// 답변 등록 요청
export const AnswerCreateFormSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.'),
  imageUrls: z.array(z.url()).optional(),
})

export type AnswerCreateForm = z.infer<typeof AnswerCreateFormSchema>

// 답변 등록 응답
export const AnswerCreateResponseSchema = z
  .object({
    answer_id: z.number().int().positive(),
    question_id: z.number().int().positive(),
    author_id: z.number().int().positive(),
    created_at: z.string(),
  })
  .transform((data) => ({
    id: data.answer_id,
    questionId: data.question_id,
    authorId: data.author_id,
    createdAt: new Date(data.created_at),
  }))

export type AnswerCreateResponse = z.infer<typeof AnswerCreateResponseSchema>

// 답변 수정 요청
export const AnswerEditFormSchema = AnswerCreateFormSchema
export type AnswerEditForm = z.infer<typeof AnswerEditFormSchema>

// 답변 수정 응답
export const AnswerEditResponseSchema = z
  .object({
    answer_id: z.number().int().positive(),
    updated_at: z.string(),
  })
  .transform((data) => ({
    answerId: data.answer_id,
    updatedAt: new Date(data.updated_at),
  }))

export type AnswerEditResponse = z.infer<typeof AnswerEditResponseSchema>

// 답변 채택 응답
export const AnswerAdoptResponseSchema = z
  .object({
    question_id: z.number().int().positive(),
    answer_id: z.number().int().positive(),
    is_adopted: z.boolean(),
  })
  .transform((data) => ({
    questionId: data.question_id,
    answerId: data.answer_id,
    isAdopted: data.is_adopted,
  }))

export type AnswerAdoptResponse = z.infer<typeof AnswerAdoptResponseSchema>

// TODO: AI 답변 생성 응답 (아직 UI & API 없음)
