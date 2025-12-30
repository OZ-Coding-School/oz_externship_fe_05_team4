import { http, HttpResponse } from 'msw'

export const QuestionCreateHandlers = [
  http.post('*/api/v1/qna/questions', async ({ request }) => {
    await request.json()
    return HttpResponse.json(
      { message: '질문이 성공적으로 등록되었습니다.', question_id: 10501 },
      { status: 201 }
    )
  }),
]
