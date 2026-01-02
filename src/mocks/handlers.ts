// handlers.ts
import { http, HttpResponse } from 'msw'

let mockSessionId = 1
export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  http.post('/chatbot/sessions/:sessionId/completions', async () => {
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        const chunks = [
          '안녕하세요.',
          '챗봇',
          '스트리밍 ',
          '응답 ',
          '테스트입니다.',
        ]

        for (const chunk of chunks) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ contents: chunk })}\n\n`)
          )
          await new Promise((r) => setTimeout(r, 300))
        }

        controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
        controller.close()
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  }),
  http.get('/chatbot/sessions', () => {
    return HttpResponse.json(
      [
        {
          id: mockSessionId,
        },
      ],
      { status: 200 }
    )
  }),
  http.post('/chatbot/sessions', async () => {
    mockSessionId += 1

    return HttpResponse.json(
      {
        id: mockSessionId,
      },
      { status: 201 }
    )
  }),
  http.post('/chatbot/sessions/:sessionId/completions', async () => {
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        const chunks = ['안녕하세요.', ' MSW ', '기반 ', '챗봇 ', '응답입니다.']

        for (const chunk of chunks) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ contents: chunk })}\n\n`)
          )
          await new Promise((r) => setTimeout(r, 300))
        }

        controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
        controller.close()
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  }),
]
