//카테고리 (API 명세 기준)
export interface QnaCategory {
  id: number
  depth: number
  names: string[]
}

//작성자 (API 명세 기준)
export interface QnaAuthor {
  id: number
  nickname: string
  profile_image_url: string | null
}

//질문 (목록 조회 아이템)
export interface QnaQuestion {
  id: number
  category: QnaCategory
  author: QnaAuthor
  title: string
  content_preview: string
  answer_count: number
  view_count: number
  created_at: string
  thumbnail_img_url: string | null
}

//질문 목록 응답
export interface QnaListResponse {
  count: number
  next: string | null
  previous: string | null
  results: QnaQuestion[]
}

//UI에서 사용하는 질문 타입
export interface Question {
  id: number
  categories: string[]
  title: string
  preview: string
  answers: number
  views: number
  time: string
  isAnswered: boolean //answer_count > 0 기준
  author: {
    name: string
    profile: string | null
  }
  thumbnailImgUrl: string | null
}

//탭 상태 (UI 상태)
export type QuestionTab = 'all' | 'answered' | 'waiting'

//API answer_status 파라미터
export type AnswerStatus = 'answered' | 'unanswered'
