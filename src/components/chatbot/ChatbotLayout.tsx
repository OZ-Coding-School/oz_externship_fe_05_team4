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

type View = 'chat' | 'followupSelect'

interface Props {
  entry: ChatbotEntry
}

export default function ChatbotLayout({ entry }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [view, setView] = useState<View>('chat')
  //진입 처리
  useEffect(() => {
    const initFloating = async () => {
      try {
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
        setMessages([
          {
            id: 1,
            role: 'assistant',
            content: '안녕하세요. 무엇을 도와드릴까요?',
          },
        ])
      } catch {
        setMessages([
          {
            id: 1,
            role: 'assistant',
            content: '로그인 후 이용할 수 있습니다.',
          },
        ])
      }
    }

    if (entry.type === 'floating') {
      initFloating()
    }

    if (entry.type === 'followup') {
      setView('followupSelect')
      setSessionId(null)
      setMessages([])
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

  //UI 렌더링
  return (
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col rounded-2xl bg-white shadow-2xl">
      <header className="bg-primary flex h-16 items-center justify-center font-semibold text-white">
        AI OZ
      </header>

      {view === 'followupSelect' && entry.type === 'followup' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-sm text-gray-700">
            이전 질문과 이어서 대화하시겠어요?
          </p>

          <div className="flex w-full gap-2">
            <button
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
              onClick={async () => {
                const sid = await createChatbotSession(entry.questionId)
                setSessionId(sid)

                const history = await getChatCompletions(sid)
                setMessages(history)
                setView('chat')
              }}
            >
              이전 대화 불러오기
            </button>

            <button
              className="bg-primary flex-1 rounded-lg px-3 py-2 text-sm text-white"
              onClick={() => {
                setMessages([
                  {
                    id: 1,
                    role: 'assistant',
                    content: '추가로 궁금한 점을 질문해 주세요.',
                  },
                ])
                setView('chat')
              }}
            >
              새 채팅하기
            </button>
          </div>
        </div>
      )}

      {view === 'chat' && (
        <>
          <main className="flex-1 overflow-y-auto px-4 py-4">
            <ChatMessageList messages={messages} />
          </main>

          <footer className="border-t px-4 py-3">
            <ChatInput onSend={handleSend} />
          </footer>
        </>
      )}
    </div>
  )
}
