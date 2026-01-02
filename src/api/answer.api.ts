import { api } from '@/lib'

// 답변 등록
const postAnswer = async (question_id: number, answer: AnswerRequest) => {
  const response = await api.post(
    `/qna/questions/${question_id}/answers`,
    answer
  )

  // TODO: AnswerResponse 예시
  // {
  //   "answer_id": 801,
  //   "question_id": 10501,
  //   "author_id": 211,
  //   "created_at": "2025-03-02 11:43:20"
  // }
  return response.data
}

// 답변 수정
const editAnswer = async (answer_id: number, answer: AnswerRequest) => {
  const response = await api.put(`/qna/answers/${answer_id}`, answer)

  // TODO: AnswerEditResponse 예시
  // {
  //   "answer_id": 801,
  //   "updated_at": "2025-03-02 11:43:20"
  // }
  return response.data
}

// 답변 채택
const acceptAnswer = async (answer_id: number) => {
  const response = await api.post(`/qna/answers/${answer_id}/accept`)

  // TODO: AnswerAcceptResponse 예시
  // {
  //   "question_id": 10501,
  //   "answer_id": 801,
  //   "is_adopted": true
  // }
  return response.data
}

// AI 답변 생성
const generateAiAnswer = async (question_id: number) => {
  const response = await api.get(`/qna/questions/${question_id}/ai-answers`)

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

export { postAnswer, editAnswer, acceptAnswer, generateAiAnswer }
