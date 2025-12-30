import type { QnaQuestion } from '@/types/question'

export interface UIQuestion {
  id: number
  categories: string[]
  title: string
  preview: string
  answers: number
  views: number
  time: string
  thumbnail: null
  author: {
    name: string
    profile: string
  }
}

export function mapQnaQuestionToUI(q: QnaQuestion): UIQuestion {
  return {
    id: q.id,
    categories: q.category.names,
    title: q.title,
    preview: q.content_preview,
    answers: q.answer_count,
    views: q.view_count,
    time: new Date(q.created_at).toLocaleString(),
    thumbnail: null,
    author: {
      name: q.author.nickname,
      profile: q.author.profile_image_url ?? '',
    },
  }
}
