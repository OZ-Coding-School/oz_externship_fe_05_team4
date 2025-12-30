import axios from 'axios'
import type { QnaListResponse } from '@/types/question'

const BASE_URL = 'https://api.ozcodingschool.site'

export async function fetchQnaQuestions(): Promise<QnaListResponse> {
  const res = await axios.get<QnaListResponse>(
    `${BASE_URL}/api/v1/qna/questions`
  )

  return res.data
}
