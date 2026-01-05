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
export async function getChatbotSessions(
  questionId?: number
): Promise<ChatbotSessionItem[]> {
  const res =
    await api.get<CursorResponse<ChatbotSessionItem>>('/chatbot/sessions')

  const all = res.data.results ?? []

  if (!questionId) return all
  return all.filter((s) => s.question === questionId)
}

//questionId로 세션 1개 찾기
export async function getSessionByQuestionId(
  questionId: number
): Promise<number | null> {
  const sessions = await getChatbotSessions(questionId)
  if (sessions.length === 0) return null

  // 질문당 1개 세션 정책이면 첫 번째로 충분
  return sessions[0].id
}

const DEFAULT_USING_MODEL = 'gemini-2.5-flash'
const TEMP_SESSION_TITLE = 'AI 질문'

export function buildCreateChatbotSessionPayload(params: {
  questionId: number
}): CreateChatbotSessionPayload {
  return {
    question: params.questionId,
    title: TEMP_SESSION_TITLE,
    using_model: DEFAULT_USING_MODEL,
  }
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
  let lastChunk = ''

  fetchEventSource(`${BASE_URL}/chatbot/sessions/${sessionId}/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.get()}`,
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({ message }),
    signal: controller.signal,

    async onopen(res) {
      if (!res.ok) {
        throw new Error(`SSE failed: ${res.status}`)
      }
    },

    onmessage(ev) {
      if (!ev.data) return

      if (ev.data === '[DONE]') {
        onComplete?.()
        controller.abort()
        return
      }

      try {
        const data: { delta?: string } = JSON.parse(ev.data)
        const chunk = data.delta ?? ''

        if (!chunk || chunk === lastChunk) return
        lastChunk = chunk

        onMessage(chunk)
      } catch {
        // malformed chunk 무시
      }
    },

    onerror(err) {
      controller.abort()
      onError?.(err)
    },
  })

  return () => controller.abort()
}
