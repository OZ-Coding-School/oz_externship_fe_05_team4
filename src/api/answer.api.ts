import { api } from '@/lib'
import {
  AnswerCreateResponseSchema,
  AnswerEditResponseSchema,
  type AnswerCreateForm,
  type AnswerCreateResponse,
  type AnswerEditForm,
  type AnswerEditResponse,
} from '@/schema/index'

// 답변 등록
const postAnswer = async (
  questionId: number,
  answer: AnswerCreateForm
): Promise<AnswerCreateResponse> => {
  const response = await api.post(
    `/qna/questions/${questionId}/answers`,
    answer
  )

  // TODO: 에러 처리 (그럴일은 없더라도)
  return AnswerCreateResponseSchema.parse(response.data)
}

// 답변 수정
const editAnswer = async (
  questionId: number,
  answerId: number,
  answer: AnswerEditForm
): Promise<AnswerEditResponse> => {
  const response = await api.put(
    `/qna/questions/${questionId}/answers/${answerId}`,
    answer
  )

  // TODO: 에러 처리 (그럴일은 없더라도)
  return AnswerEditResponseSchema.parse(response.data)
}

// 답변 삭제
const deleteAnswer = async (
  questionId: number,
  answerId: number
): Promise<void> => {
  await api.delete(`/qna/questions/${questionId}/answers/${answerId}`)
}

// 답변 채택
const acceptAnswer = async (answerId: number) => {
  const response = await api.post(`/qna/answers/${answerId}/accept`)

  // TODO: AnswerAcceptResponse 예시
  // {
  //   "question_id": 10501,
  //   "answer_id": 801,
  //   "is_adopted": true
  // }
  return response.data
}

// AI 답변 생성
const generateAiAnswer = async (questionId: number) => {
  const response = await api.get(`/qna/questions/${questionId}/ai-answers`)

  // TODO: AiAnswerResponse 예시
  // {
  //   "id": 801,
  //   "question_id": 10501,
  //   "output": "...",
  //   "using_model": "...",
  //   "created_at": "2025-03-02 11:43:20",
  // }
  return response.data
}

export { postAnswer, editAnswer, deleteAnswer, acceptAnswer, generateAiAnswer }
