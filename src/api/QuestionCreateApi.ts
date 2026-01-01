import type { QuestionCreate, QuestionCreateResponse } from '@/types'
import { api, token } from '@/lib'

export const QuestionCreateApi = async (
  payload: QuestionCreate
): Promise<QuestionCreateResponse> => {
  const res = await api.post(
    'https://api.ozcodingschool.site/api/v1/qna/questions',
    {
      title: payload.title,
      content: payload.content,
      category: payload.category,
    },
    {
      headers: {
        Authorization: `Bearer ${token.get()}`,
      },
    }
  )

  return {
    message: res.data.message,
    questionId: res.data.question_id,
  }
}
