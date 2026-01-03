import { z } from 'zod'

// 베이스와 각 파츠를 먼저 생성하고 밑에서 조립하여 완성

// 파츠
// 작성자 정보
const AuthorSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profile_image_url: z.url().nullable(),
  role: z.enum(['TA', 'LC', 'OM', 'ST', 'AD', 'U']).optional(),
})

// 카테고리 정보
const CategorySchema = z.object({
  id: z.number(),
  depth: z.number(),
  names: z.array(z.string()).min(1),
})

// 이미지 정보 (상세화면용)
const ImageSchema = z.object({
  id: z.number(),
  img_url: z.url(),
})

// 베이스
// 질문
const QuestionBaseSchema = z.object({
  id: z.number(),
  title: z.string(),
  view_count: z.number(),
  created_at: z.string(),
  author: AuthorSchema,
  category: CategorySchema,
})

// 댓글
const CommentSchema = z
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

// 답변
const AnswerSchema = z
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
// 조립하여 사용할 스키마 완성

// 목록 조회
export const QuestionListItemSchema = QuestionBaseSchema.extend({
  content_preview: z.string(),
  answer_count: z.number(),
  thumbnail_img_url: z.url().nullable(),
}).transform((data) => ({
  id: data.id,
  title: data.title,
  viewCount: data.view_count,
  createdAt: new Date(data.created_at),
  category: data.category,
  author: {
    id: data.author.id,
    nickname: data.author.nickname,
    profileImageUrl: data.author.profile_image_url,
    role: data.author.role,
  },
  contentPreview: data.content_preview,
  answerCount: data.answer_count,
  thumbnailImgUrl: data.thumbnail_img_url,
}))

export const QuestionListSchema = z.object({
  count: z.number(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(QuestionListItemSchema),
})

export type QuestionList = z.infer<typeof QuestionListSchema>

// 상세 조회 & 수정 응답
export const QuestionDetailSchema = QuestionBaseSchema.extend({
  content: z.string(),
  images: z.array(ImageSchema),
  answers: z.array(AnswerSchema),
}).transform((data) => ({
  id: data.id,
  title: data.title,
  viewCount: data.view_count,
  createdAt: new Date(data.created_at),
  content: data.content,
  category: data.category,
  images: data.images.map((img) => ({
    id: img.id,
    imgUrl: img.img_url,
  })),
  author: {
    id: data.author.id,
    nickname: data.author.nickname,
    profileImageUrl: data.author.profile_image_url,
    role: data.author.role,
  },

  // 답변
  answers: data.answers,
}))

export type QuestionDetail = z.infer<typeof QuestionDetailSchema>

// 등록 요청
export const QuestionCreateFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(50, '제목은 50자 이하로 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  category: z.coerce.number().int().positive('카테고리를 선택해주세요.'),
})

export type QuestionCreateForm = z.infer<typeof QuestionCreateFormSchema>

// 등록 응답
export const QuestionCreateResponseSchema = z
  .object({
    message: z.string(),
    question_id: z.number().int().positive(),
  })
  .transform((data) => ({
    message: data.message,
    questionId: data.question_id,
  }))

export type QuestionCreateResponse = z.infer<
  typeof QuestionCreateResponseSchema
>

// (등록 요청, 상세 조회와 동일하지만 나중에 변경시 수정하기도 수월하고, 현재도 더 명시적으로 분리)
// 수정 요청
export const QuestionEditFormSchema = QuestionCreateFormSchema
export type QuestionEditForm = z.infer<typeof QuestionEditFormSchema>

// 수정 응답
export const QuestionEditResponseSchema = QuestionDetailSchema
export type QuestionEditResponse = z.infer<typeof QuestionEditResponseSchema>

// ===============================================================================
// 답변

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

// 답변 삭제 요청
export const AnswerDeleteFormSchema = z.object({
  answer_id: z.number().int().positive(),
})

export type AnswerDeleteForm = z.infer<typeof AnswerDeleteFormSchema>

// ===============================================================================
// 댓글

// 댓글 등록 요청
