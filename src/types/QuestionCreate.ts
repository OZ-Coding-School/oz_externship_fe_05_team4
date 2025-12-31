export interface QuestionCreate {
  title: string
  content: string
  category: number
}

export interface QuestionCreateResponse {
  message: string
  questionId: number
}

export interface QuestionCreateErrorResponse {
  400: { error_detail: string }
  401: { error_detail: string }
  403: { error_detail: string }
}
