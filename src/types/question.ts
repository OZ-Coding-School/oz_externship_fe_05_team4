export interface QnaCategory {
  id: number
  depth: number
  names: string[]
}

export interface QnaAuthor {
  id: number
  nickname: string
  profile_image_url: string | null
}

export interface QnaQuestion {
  id: number
  category: QnaCategory
  author: QnaAuthor
  title: string
  content_preview: string
  answer_count: number
  view_count: number
  created_at: string
}

export interface QnaListResponse {
  count: number
  next: string | null
  previous: string | null
  results: QnaQuestion[]
}
