import { api } from './api'

export async function fetchQuestions(query: string) {
  const res = await api.get(`/api/v1/qna/questions?${query}`)
  return res.data
}
