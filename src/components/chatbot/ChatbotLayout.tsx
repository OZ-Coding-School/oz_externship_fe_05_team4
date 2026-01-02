import { useEffect, useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { ChatMessageType, ChatMode, ChatbotEntry } from '@/types'
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
  const [mode, setMode] = useState<ChatMode>('chat')

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
            setMode('chat')
            return
          }
        }

        const sid = await createChatbotSession()
        setSessionId(sid)
        setMessages([GREETING_MESSAGE])
        setMode('chat')
      }

      initFloating()
      return
    }

    // 추가 질문 진입
    if (entry.type === 'followup') {
      setMessages([GREETING_MESSAGE])
      setSessionId(null)
      setMode('select')
    }
  }, [entry])

  const handleSend = async (text: string) => {
    if (mode !== 'chat') return

    let currentSessionId = sessionId

    if (currentSessionId === null) {
      const questionId =
        entry.type === 'followup' ? entry.questionId : undefined

      currentSessionId = await createChatbotSession(questionId)
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

  return (
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col rounded-2xl bg-white shadow-2xl">
      <header className="bg-primary flex h-14 items-center px-4 font-semibold text-white">
        AI OZ
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div
          className={`transition-all duration-200 ease-out ${
            mode === 'select'
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          {mode === 'select' && (
            <div className="mb-4 flex gap-2">
              <button
                className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-700"
                onClick={async () => {
                  if (entry.type !== 'followup') return

                  const sid = await createChatbotSession(entry.questionId)
                  setSessionId(sid)
                  const history = await getChatCompletions(sid)
                  setMessages(history)
                  setMode('chat')
                }}
              >
                이전 대화 불러오기
              </button>

              <button
                className="bg-primary flex-1 rounded-full px-3 py-2 text-xs text-white"
                onClick={async () => {
                  if (entry.type !== 'followup') return

                  const sid = await createChatbotSession(entry.questionId)
                  setSessionId(sid)
                  setMessages([FOLLOWUP_MESSAGE])
                  setMode('chat')
                }}
              >
                새 채팅하기
              </button>
            </div>
          )}
        </div>

        <ChatMessageList messages={messages} />
      </main>

      <footer className="border-t px-4 py-3">
        <ChatInput onSend={handleSend} disabled={mode === 'select'} />
      </footer>
    </div>
  )
}
