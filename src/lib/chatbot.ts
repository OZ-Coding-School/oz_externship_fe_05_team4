import type { ChatMessageType, CreateChatbotSessionPayload } from '@/types'
import { api } from '@/lib/api'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { token } from './'
import { BASE_URL } from '@/data'

interface CompletionItem {
  id: number
  role: 'user' | 'assistant'
  message: string
}

interface PaginatedResponse<T> {
  results: T[]
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
  const res = await api.get<PaginatedResponse<CompletionItem>>(
    `/chatbot/sessions/${sessionId}/completions`
  )

  return (res.data?.results ?? []).map((item) => ({
    id: item.id,
    role: item.role,
    content: item.message,
  }))
}

//마지막 세션
// export async function getLastChatbotSession(): Promise<number | null> {
//   const res =
//     await api.get<PaginatedResponse<{ id: number }>>('/chatbot/sessions')
//   const items = safeResults(res.data)
//   return items.length ? items[0].id : null
// }

//SSE
interface StreamParams {
  sessionId: number
  message: string
  onMessage: (chunk: string) => void
  onComplete?: () => void
  onError?: (e: unknown) => void
}

export function streamChatCompletion({
  sessionId,
  message,
  onMessage,
  onComplete,
  onError,
}: StreamParams) {
  const controller = new AbortController()

  fetchEventSource(`${BASE_URL}/chatbot/sessions/${sessionId}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.get()}`,
    },
    body: JSON.stringify({ message }),
    signal: controller.signal,

    onopen: async (res) => {
      if (!res.ok) {
        throw new Error(`SSE failed: ${res.status}`)
      }
    },
    onmessage(ev) {
      if (ev.data === '[DONE]') {
        onComplete?.()
        controller.abort()
        return
      }

      try {
        const data = JSON.parse(ev.data)
        if (data.delta) onMessage(data.delta)
      } catch {
        //ignore malformed chunk
      }
    },

    onerror(err) {
      controller.abort()
      onError?.(err)
    },
  })

  return () => controller.abort()
}
