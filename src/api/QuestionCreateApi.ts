import axios from 'axios'
import type { QuestionCreate, QuestionCreateResponse } from '@/types'
import { token } from '@/lib'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token.get()}`,
//   },
// })

export const QuestionCreateApi = async (
  payload: QuestionCreate
): Promise<QuestionCreateResponse> => {
  const res = await axios.post(
    'https://api.ozcodingschool.site/api/v1/qna/questions',
    {
      title: payload.title,
      content: payload.content,
      // TODO: 카테고리 수정이후 주석 돌리기.
      category: payload.category,
      // category: 1,
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
