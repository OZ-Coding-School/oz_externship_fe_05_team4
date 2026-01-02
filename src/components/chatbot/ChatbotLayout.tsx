import { useEffect, useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { ChatMessageType, ChatbotEntry } from '@/types'
import {
  createChatbotSession,
  getChatCompletions,
  getLastChatbotSession,
  streamChatCompletion,
} from '@/lib/chatbot'
import { token } from '@/lib'

interface Props {
  entry: ChatbotEntry
}

const GREETING_MESSAGE: ChatMessageType = {
  id: 1,
  role: 'assistant',
  content: '안녕하세요. 무엇을 도와드릴까요?',
}

const FOLLOWUP_MESSAGE: ChatMessageType = {
  id: 1,
  role: 'assistant',
  content: '추가로 궁금한 점을 질문해 주세요.',
}

export default function ChatbotLayout({ entry }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)

  //진입 처리
  useEffect(() => {
    // 플로팅 진입
    if (entry.type === 'floating') {
      const initFloating = async () => {
        const accessToken = token.get()

        if (!accessToken) {
          setMessages([
            {
              id: 1,
              role: 'assistant',
              content: '로그인 후 이용할 수 있습니다.',
            },
          ])
          return
        }

        const lastSessionId = await getLastChatbotSession()

        if (lastSessionId) {
          setSessionId(lastSessionId)
          const history = await getChatCompletions(lastSessionId)

          if (history.length > 0) {
            setMessages(history)
            return
          }
        }

        const newSessionId = await createChatbotSession()
        setSessionId(newSessionId)
        setMessages([GREETING_MESSAGE])
      }

      initFloating()
      return
    }

    //추가 질문 진입
    if (entry.type === 'followup') {
      const initFollowup = async () => {
        const sid = await createChatbotSession(entry.questionId)
        setSessionId(sid)
        setMessages([FOLLOWUP_MESSAGE])
      }

      initFollowup()
    }
  }, [entry])

  //메시지 전송
  const handleSend = async (text: string) => {
    let currentSessionId = sessionId

    if (currentSessionId === null) {
      currentSessionId = await createChatbotSession(
        entry.type === 'followup' ? entry.questionId : undefined
      )
      setSessionId(currentSessionId)
    }

    const userId = Date.now()
    const assistantId = userId + 1

    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', content: text },
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        status: 'loading',
      },
    ])

    try {
      await streamChatCompletion({
        sessionId: currentSessionId,
        message: text,
        assistantId,
        setMessages,
      })

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, status: undefined } : msg
        )
      )
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, status: 'error' } : msg
        )
      )
    }
  }

  //UI
  return (
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col rounded-2xl bg-white shadow-2xl">
      <header className="bg-primary flex h-16 items-center justify-center font-semibold text-white">
        AI OZ
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        <ChatMessageList messages={messages} />
      </main>

      <footer className="border-t px-4 py-3">
        <ChatInput onSend={handleSend} />
      </footer>
    </div>
  )
}
