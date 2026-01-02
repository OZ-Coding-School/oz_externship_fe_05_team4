import { z } from 'zod'

// 베이스와 각 파츠를 먼저 생성하고 밑에서 조립하여 완성

// 파츠
// 작성자 정보
const AuthorSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profile_image_url: z.url().nullable(),
})

// 카테고리 정보
const CategorySchema = z.object({
  id: z.number(),
  depth: z.number(),
  names: z.array(z.string()),
})

// 이미지 정보 (상세화면용)
const ImageSchema = z.object({
  id: z.number(),
  img_url: z.url(),
})

// 베이스
// 질문
const QuestionBase = z.object({
  id: z.number(),
  title: z.string(),
  view_count: z.number(),
  created_at: z.string(),
  author: AuthorSchema,
  category: CategorySchema,
})

// 댓글
const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  created_at: z.string(),
  author: AuthorSchema,
})

// 답변
const AnswerSchema = z.object({
  id: z.number(),
  content: z.string(),
  created_at: z.string(),
  is_adopted: z.boolean(),
  author: AuthorSchema,
  comments: z.array(CommentSchema),
})

// ===============================================================================

// 조립하여 사용할 스키마 완성
// 목록 조회
export const QuestionListItemSchema = QuestionBase.extend({
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

// 상세 조회
export const QuestionDetailSchema = QuestionBase.extend({
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
  },

  // 답변
  answers: data.answers.map((answer) => ({
    id: answer.id,
    content: answer.content,
    createdAt: new Date(answer.created_at),
    isAdopted: answer.is_adopted,
    author: {
      id: answer.author.id,
      nickname: answer.author.nickname,
      profileImageUrl: answer.author.profile_image_url,
    },

    // 답변의 댓글
    comments: answer.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: new Date(comment.created_at),
      author: {
        id: comment.author.id,
        nickname: comment.author.nickname,
        profileImageUrl: comment.author.profile_image_url,
      },
    })),
  })),
}))

export type QuestionDetail = z.infer<typeof QuestionDetailSchema>

// 등록 & 수정
