import type { Question } from '@/types'
import { QUESTIONS_MOCK } from '@/mocks/questions.mock'

export async function fetchQuestions(): Promise<Question[]> {
  //더미
  return QUESTIONS_MOCK
}
