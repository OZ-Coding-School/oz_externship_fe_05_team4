import { useEffect, useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type {
  ChatMessageType,
  ChatMode,
  ChatbotEntry,
  CreateChatbotSessionPayload,
} from '@/types'
import { createChatbotSession, streamChatCompletion } from '@/lib/chatbot'
import { token } from '@/lib'
import chatbotIcon from '@/assets/chatbot.png'
import { ArrowLeft } from 'lucide-react'

interface Props {
  entry: ChatbotEntry
  onBack?: () => void
}

const GREETING_MESSAGE: ChatMessageType = {
  id: 1,
  role: 'assistant',
  content: '안녕하세요. 무엇을 도와드릴까요?',
}

export default function ChatbotLayout({ entry, onBack }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [mode, setMode] = useState<ChatMode>('chat')

  /* 최초 진입 */
  useEffect(() => {
    if (!token.get()) {
      setMessages([
        {
          id: 99,
          role: 'assistant',
          content: '로그인 후 이용할 수 있습니다.',
        },
      ])
      return
    }

    setMessages([GREETING_MESSAGE])
    setSessionId(null)
    setMode('chat')
  }, [entry.type])

  /* 메시지 전송 */
  const handleSend = async (text: string) => {
    if (mode !== 'chat') return

    let sid = sessionId

    // 세션 생성
    if (!sid) {
      const payload: CreateChatbotSessionPayload = {
        title: 'AI 챗봇 대화',
        using_model: 'gemini-2.5-flash',
        question: entry.type === 'followup' ? entry.questionId : 17,
      }

      sid = await createChatbotSession(payload)
      setSessionId(sid)
    }

    const userId = Date.now()
    const assistantId = userId + 1

    // user + assistant placeholder
    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', content: text },
      { id: assistantId, role: 'assistant', content: '', status: 'loading' },
    ])

    // SSE 시작
    streamChatCompletion({
      sessionId: sid,
      message: text,

      onMessage: (chunk) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        )
      },

      onComplete: () => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, status: undefined } : m
          )
        )
      },

      onError: () => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  status: 'error',
                  content: '응답 중 오류가 발생했습니다.',
                }
              : m
          )
        )
      },
    })
  }

  return (
    <div className="fixed right-6 bottom-24 z-[998] flex h-[560px] w-[360px] flex-col overflow-hidden rounded-[24px] bg-[var(--color-white)] shadow-2xl">
      {/* Header */}
      <header className="relative flex h-[64px] items-center bg-[var(--color-chatbot-primary)] text-[var(--color-white)]">
        {/* left */}
        <button
          className="absolute left-0 flex h-full w-12 items-center justify-center"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        {/* center */}
        <div className="mx-auto flex items-center gap-3">
          <img
            src={chatbotIcon}
            alt="AI OZ"
            className="h-9 w-9 rounded-full bg-[var(--color-white)] p-1"
          />
          <span className="text-[18px] font-semibold">AI OZ</span>
        </div>
      </header>

      {/* Messages 테스트용 코드 추후 삭제 */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {entry.type === 'followup' && (
          <section className="mx-4 mt-3 mb-2 rounded-[12px] bg-[var(--color-gray-250)] px-4 py-3">
            <p className="mb-1 text-xs text-[var(--color-gray-400)]">
              이 질문에 대해 추가로 물어보세요
            </p>
            <p className="line-clamp-2 text-sm font-medium text-[var(--color-gray-600)]">
              질문 ID: {entry.questionId}
            </p>
          </section>
        )}
        <ChatMessageList messages={messages} />
      </main>

      <footer className="border-t border-[var(--color-chatbot-input-border)] bg-[var(--color-chatbot-input-bg)]">
        <div className="px-4 py-3">
          <ChatInput disabled={mode !== 'chat'} onSend={handleSend} />
        </div>
      </footer>
    </div>
  )
}
