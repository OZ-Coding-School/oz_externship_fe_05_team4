import { api } from '@/lib/index'
import { QuestionDetailSchema } from '@/schema/question.schema'

const fetchQuestions = async (query: string) => {
  const response = await api.get(`/qna/questions?${query}`)
  return response.data
}

const fetchQuestionDetail = async (id: string) => {
  const response = await api.get(`/qna/questions/${id}`)
  return QuestionDetailSchema.parse(response.data)
}

export { fetchQuestions, fetchQuestionDetail }
