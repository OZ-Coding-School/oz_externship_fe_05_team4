import { useEffect, useRef, useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { ChatMessageType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getChatCompletions, streamChatCompletion } from '@/lib/chatbot'
import { ArrowLeft, X } from 'lucide-react'

interface Props {
  questionId: number
  sessionId: number
  onBack: () => void
  onClose: () => void
}

const GREETING: ChatMessageType = {
  id: -1,
  role: 'assistant',
  content: '안녕하세요. 무엇을 도와드릴까요?',
}

export default function ChatbotLayout({
  questionId,
  sessionId,
  onBack,
  onClose,
}: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef<(() => void) | null>(null)

  const { data = [] } = useQuery({
    queryKey: ['chatbot', questionId, sessionId],
    queryFn: () => getChatCompletions(sessionId),
    select: (d) => (d.length > 0 ? d : [GREETING]),
  })

  // 세션 변경 시 메시지 초기화
  useEffect(() => {
    setMessages([])
  }, [sessionId])

  // 서버 데이터 반영
  useEffect(() => {
    setMessages(data)
  }, [data])

  // 언마운트 시 SSE 종료
  useEffect(() => {
    return () => {
      abortRef.current?.()
      abortRef.current = null
    }
  }, [])

  const handleSend = (text: string) => {
    if (isStreaming) return

    const userId = Date.now()
    const assistantId = userId + 1

    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', content: text },
      { id: assistantId, role: 'assistant', content: '', status: 'loading' },
    ])

    setIsStreaming(true)

    abortRef.current = streamChatCompletion({
      sessionId,
      message: text,
      onMessage: (chunk) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        )
      },
      onComplete: () => {
        setIsStreaming(false)
        abortRef.current = null
      },
      onError: () => {
        setIsStreaming(false)
        abortRef.current = null
      },
    })
  }

  const handleBack = () => {
    abortRef.current?.()
    abortRef.current = null
    onBack()
  }

  const handleClose = () => {
    abortRef.current?.()
    abortRef.current = null
    onClose()
  }

  return (
    <div className="flex h-full flex-col">
      <header className="relative flex h-14 items-center justify-center bg-[var(--color-chatbot-primary)] text-white">
        <button onClick={handleBack} className="absolute left-4">
          <ArrowLeft size={20} />
        </button>
        AI OZ
        <button onClick={handleClose} className="absolute right-4">
          <X size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        <ChatMessageList sessionId={sessionId} messages={messages} />
      </main>

      <footer className="border-t px-4 py-3">
        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </footer>
    </div>
  )
}
