import type { ChatMessageType } from '@/types'
import axios from 'axios'
import { token } from '@/lib/auth.token'

//타입
interface ChatSession {
  id: number
}

//axios 인스턴스
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

function authHeader() {
  const accessToken = token.get()
  if (!accessToken) {
    throw new Error('NO_ACCESS_TOKEN')
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  }
}

//세션 생성
export async function createChatbotSession(
  questionId?: number
): Promise<number> {
  const res = await api.post<{ id: number }>(
    '/chatbot/sessions',
    questionId ? { question_id: questionId } : {},
    { headers: authHeader() }
  )

  return res.data.id
}

//이전 대화 불러오기
export async function getChatCompletions(
  sessionId: number
): Promise<ChatMessageType[]> {
  const res = await api.get<{
    results?: {
      id: number
      role: 'user' | 'assistant'
      message: string
    }[]
  }>(`/chatbot/sessions/${sessionId}/completions`, {
    headers: authHeader(),
  })

  const results = res.data?.results

  if (!Array.isArray(results)) return []

  return results.map((item) => ({
    id: item.id,
    role: item.role,
    content: item.message,
  }))
}

//마지막 세션 조회
export async function getLastChatbotSession(): Promise<number | null> {
  const res = await api.get<ChatSession[]>('/chatbot/sessions', {
    headers: authHeader(),
  })

  if (!res.data.length) return null
  return res.data[0].id
}

// SSE 스트리밍
interface StreamParams {
  sessionId: number
  message: string
  assistantId: number
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>
}

interface StreamChunk {
  contents: string
}

export async function streamChatCompletion({
  sessionId,
  message,
  assistantId,
  setMessages,
}: StreamParams): Promise<void> {
  const accessToken = token.get()
  if (!accessToken) throw new Error('NO_ACCESS_TOKEN')

  const res = await fetch(`/chatbot/sessions/${sessionId}/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({ message }),
  })

  if (!res.ok || !res.body) {
    throw new Error('SSE_FAILED')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''
  let acc = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (let line of lines) {
      line = line.trim()
      if (!line.startsWith('data:')) continue

      const payload = line.replace(/^data:\s*/, '').trim()
      if (!payload) continue
      if (payload === '[DONE]') return

      try {
        const parsed = JSON.parse(payload) as StreamChunk
        const next = parsed.contents ?? ''

        if (next.startsWith(acc)) {
          acc = next
        } else {
          acc += next
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
        )
      } catch {
        continue
      }
    }
  }
}
