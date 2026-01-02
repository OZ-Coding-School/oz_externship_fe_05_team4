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
import chatbotIcon from '@/assets/chatbot.png'

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

  //진입 처리
  useEffect(() => {
    if (entry.type === 'floating') {
      const init = async () => {
        if (!token.get()) {
          setMessages([
            {
              id: 1,
              role: 'assistant',
              content: '로그인 후 이용할 수 있습니다.',
            },
          ])
          return
        }

        //플로팅
        const last = await getLastChatbotSession()
        if (last) {
          setSessionId(last)
          const history = await getChatCompletions(last)
          if (history.length) {
            setMessages(history)
            return
          }
        }

        const sid = await createChatbotSession()
        setSessionId(sid)
        setMessages([GREETING_MESSAGE])
      }

      init()
      return
    }

    //추가 질문
    if (entry.type === 'followup') {
      setMessages([GREETING_MESSAGE])
      setSessionId(null)
      setMode('select')
    }
  }, [entry])

  //메시지 전송
  const handleSend = async (text: string) => {
    if (mode !== 'chat') return

    let sid = sessionId
    if (!sid) {
      sid = await createChatbotSession(
        entry.type === 'followup' ? entry.questionId : undefined
      )
      setSessionId(sid)
    }

    const userId = Date.now()
    const assistantId = userId + 1

    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', content: text },
      { id: assistantId, role: 'assistant', content: '', status: 'loading' },
    ])

    await streamChatCompletion({
      sessionId: sid,
      message: text,
      assistantId,
      setMessages,
    })

    setMessages((prev) =>
      prev.map((m) => (m.id === assistantId ? { ...m, status: undefined } : m))
    )
  }

  return (
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      {/* HEADER */}
      <header className="bg-primary flex h-[56px] shrink-0 items-center gap-2 px-4 text-white">
        <img
          src={chatbotIcon}
          className="h-6 w-6 rounded-full bg-white p-[2px]"
        />
        <span className="text-sm font-semibold">AI OZ</span>
      </header>

      <main className="flex-1 overflow-y-auto bg-white px-4 py-3">
        {mode === 'select' && (
          <div className="mb-3 flex gap-2">
            <button
              className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-xs"
              onClick={async () => {
                if (entry.type !== 'followup') return
                const sid = await createChatbotSession(entry.questionId)
                setSessionId(sid)
                setMessages(await getChatCompletions(sid))
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

        <ChatMessageList messages={messages} />
      </main>

      {/* FOOTER */}
      <footer className="shrink-0 border-t px-4 py-3">
        <ChatInput onSend={handleSend} disabled={mode === 'select'} />
      </footer>
    </div>
  )
}
