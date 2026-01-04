import type { ChatMessageType, CreateChatbotSessionPayload } from '@/types'
import { api } from '@/lib/api'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { token } from './'
import { BASE_URL } from '@/constants'

interface CompletionItem {
  id: number
  role: 'user' | 'assistant'
  message: string
  create_at?: string
}

interface CursorResponse<T> {
  results: T[]
}

export interface ChatbotSessionItem {
  id: number
  question: number
  title: string
  using_model: string
}

//세션 조회
export async function getChatbotSessions(): Promise<ChatbotSessionItem[]> {
  const res =
    await api.get<CursorResponse<ChatbotSessionItem>>('/chatbot/sessions')
  return res.data.results
}

//questionId로 세션 1개 찾기
export async function getSessionByQuestionId(
  questionId: number
): Promise<number | null> {
  const sessions = await getChatbotSessions()
  const found = sessions.find((s) => s.question === questionId)
  return found ? found.id : null
}

//세션 생성
export async function createChatbotSession(
  payload: CreateChatbotSessionPayload
): Promise<number> {
  const res = await api.post('/chatbot/sessions', payload)
  return res.data.id
}

//이전 대화 목록 조회
export async function getChatCompletions(
  sessionId: number
): Promise<ChatMessageType[]> {
  const res = await api.get<CursorResponse<CompletionItem>>(
    `/chatbot/sessions/${sessionId}/completions`
  )
  const items = res.data.results ?? []

  //오래된 → 최신 순으로 정렬
  const sorted = [...items].sort((a, b) => {
    if (a.create_at && b.create_at) {
      return new Date(a.create_at).getTime() - new Date(b.create_at).getTime()
    }
    return a.id - b.id
  })

  return sorted.map((item) => ({
    id: item.id,
    role: item.role,
    content: item.message,
  }))
}

//SSE
export function streamChatCompletion({
  sessionId,
  message,
  onMessage,
  onComplete,
  onError,
}: {
  sessionId: number
  message: string
  onMessage: (chunk: string) => void
  onComplete?: () => void
  onError?: (e: unknown) => void
}) {
  const controller = new AbortController()

  //같은 chunk가 중복으로 오는 케이스 방지
  let lastChunk = ''

  fetchEventSource(`${BASE_URL}/chatbot/sessions/${sessionId}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Accept: 'text/event-stream',
      Accept: '*/*',
      Authorization: `Bearer ${token.get()}`,
    },
    body: JSON.stringify({ message }),
    signal: controller.signal,

    async onopen(res) {
      if (!res.ok) throw new Error(`SSE failed: ${res.status}`)
    },

    onmessage(ev) {
      if (!ev.data) return

      if (ev.data === '[DONE]') {
        onComplete?.()
        controller.abort()
        return
      }

      try {
        const data = JSON.parse(ev.data)

        //서버가 delta로 주는 케이스 기준
        const chunk: string = data.delta ?? ''

        //중복 chunk 무시
        if (!chunk || chunk === lastChunk) return
        lastChunk = chunk

        onMessage(chunk)
      } catch {
        // ignore malformed chunk
      }
    },

    onerror(err) {
      controller.abort()
      onError?.(err)
    },
  })

  return () => controller.abort()
}
