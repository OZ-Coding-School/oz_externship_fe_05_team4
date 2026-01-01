// 답변
export interface AnswerResponse {
  id: number
  author_id: number
  question_id: number
  content: string
  is_adopted: boolean
  created_at: string
  updated_at: string
}

export interface Answer extends Pick<AnswerResponse, 'id' | 'content'> {
  authorId: number
  questionId: number
  isAdopted: boolean
  createdAt: Date
  updatedAt: Date
}

// AI 생성 답변
export interface AiAnswerResponse
  extends Pick<
    AnswerResponse,
    'id' | 'question_id' | 'created_at' | 'updated_at'
  > {
  output: string
  using_model: string
}

export interface AiAnswer
  extends Pick<Answer, 'id' | 'questionId' | 'createdAt' | 'updatedAt'> {
  output: string
  usingModel: string
}

// 댓글
export interface CommentResponse {
  id: number
  author_id: number
  answer_id: number
  content: string
  created_at: string
  updated_at: string
}

export interface Comment extends Pick<CommentResponse, 'id' | 'content'> {
  authorId: number
  answerId: number
  createdAt: Date
  updatedAt: Date
}
