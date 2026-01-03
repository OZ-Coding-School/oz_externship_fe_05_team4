import { useEffect, useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { ChatMessageType, ChatbotEntry } from '@/types'
import {
  createChatbotSession,
  getSessionByQuestionId,
  getChatCompletions,
  streamChatCompletion,
} from '@/lib/chatbot'
import { token } from '@/lib'
import chatbotIcon from '@/assets/chatbot.png'
import { ArrowLeft } from 'lucide-react'

const GREETING_MESSAGE: ChatMessageType = {
  id: -1,
  role: 'assistant',
  content: '안녕하세요. 무엇을 도와드릴까요?',
}

export default function ChatbotLayout({
  entry,
  onBack,
}: {
  entry: ChatbotEntry
  onBack?: () => void
}) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)

  useEffect(() => {
    if (!token.get()) {
      setMessages([
        {
          id: -99,
          role: 'assistant',
          content: '로그인 후 이용할 수 있습니다.',
        },
      ])
      return
    }

    const init = async () => {
      if (entry.type === 'followup') {
        const sessionId = await getSessionByQuestionId(entry.questionId)

        if (sessionId) {
          setSessionId(sessionId)
          setMessages(await getChatCompletions(sessionId))
          return
        }

        const newSessionId = await createChatbotSession({
          title: 'AI 챗봇 대화',
          using_model: 'gemini-2.5-flash',
          ...(entry.type === 'followup' ? { question: entry.questionId } : {}),
        })

        setSessionId(newSessionId)
        setMessages([GREETING_MESSAGE])
        return
      }

      // floating
      setSessionId(null)
      setMessages([GREETING_MESSAGE])
    }

    init()
  }, [entry])

  const handleSend = async (text: string) => {
    if (!sessionId) return

    const uid = Date.now()
    const aid = uid + 1

    setMessages((p) => [
      ...p,
      { id: uid, role: 'user', content: text },
      { id: aid, role: 'assistant', content: '', status: 'loading' },
    ])

    streamChatCompletion({
      sessionId,
      message: text,
      onMessage: (chunk) =>
        setMessages((p) =>
          p.map((m) =>
            m.id === aid ? { ...m, content: m.content + chunk } : m
          )
        ),
      onComplete: () =>
        setMessages((p) =>
          p.map((m) => (m.id === aid ? { ...m, status: undefined } : m))
        ),
    })
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex h-[64px] items-center bg-purple-600 text-white">
        <button onClick={onBack} className="absolute left-3">
          <ArrowLeft size={20} />
        </button>
        <div className="mx-auto flex items-center gap-2">
          <img
            src={chatbotIcon}
            className="h-8 w-8 rounded-full bg-white p-1"
          />
          AI OZ
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-3">
        <ChatMessageList messages={messages} />
      </main>

      <footer className="border-t p-3">
        <ChatInput onSend={handleSend} />
      </footer>
    </div>
  )
}
