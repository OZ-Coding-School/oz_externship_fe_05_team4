import { api } from '@/lib/api'
import {
  QuestionDetailSchema,
  QuestionEditFormSchema,
  QuestionEditResponseSchema,
  type QuestionDetail,
  type QuestionEditForm,
  type QuestionEditResponse,
} from '@/schema/question.schema'

export const getQuestionDetail = async (
  questionId: number
): Promise<QuestionDetail> => {
  const res = await api.get<unknown>(`/qna/questions/${questionId}`)
  return QuestionDetailSchema.parse(res.data)
}

export const patchQuestion = async (
  questionId: number,
  body: QuestionEditForm
): Promise<QuestionEditResponse> => {
  const payload = QuestionEditFormSchema.parse(body)

  const res = await api.patch<unknown>(`/qna/questions/${questionId}`, payload)
  return QuestionEditResponseSchema.parse(res.data)
}
