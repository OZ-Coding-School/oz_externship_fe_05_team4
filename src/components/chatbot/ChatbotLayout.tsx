import { useEffect, useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { ChatMessageType } from '@/types'
import { createChatbotSession, streamChatCompletion } from '@/lib/chatbot'

type Entry = { type: 'floating' } | { type: 'followup'; questionId: number }

type View = 'chat' | 'followupSelect'

interface Props {
  entry: Entry
}

export default function ChatbotLayout({ entry }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [view, setView] = useState<View>('chat')

  //진입 방식에 따른 초기 화면 설정
  useEffect(() => {
    if (entry.type === 'floating') {
      //플로팅 버튼 진입
      setView('chat')
      setSessionId(null)
      setMessages([
        {
          id: 1,
          role: 'assistant',
          content: '안녕하세요. 무엇을 도와드릴까요?',
        },
      ])
    }

    if (entry.type === 'followup') {
      //추가 질문하기 진입
      setView('followupSelect')
      setSessionId(null)
      setMessages([])
    }
  }, [entry])

  //메시지 전송 (API는 다음 단계)
  const handleSend = async (text: string) => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    const userId = Date.now()
    const assistantId = userId + 1

    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', content: text },
      { id: assistantId, role: 'assistant', content: '' },
    ])

    let sid = sessionId
    if (!sid) {
      sid = await createChatbotSession(token)
      setSessionId(sid)
    }

    await streamChatCompletion({
      sessionId: sid,
      message: text,
      assistantId,
      token,
      setMessages,
    })
  }

  return (
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col rounded-[24px] bg-white shadow-2xl">
      {/* Header */}
      <header className="bg-primary flex h-16 items-center justify-center rounded-t-[24px] font-semibold text-white">
        AI OZ
      </header>

      {/*추가 질문하기 선택 화면*/}
      {view === 'followupSelect' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-sm text-gray-700">
            안녕하세요. 무엇을 도와드릴까요?
          </p>

          <div className="flex w-full gap-2">
            <button
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
              onClick={() => {
                // 이전 대화 불러오기 (다음 단계에서 API 연결)
                setView('chat')
                setMessages([
                  {
                    id: 1,
                    role: 'assistant',
                    content: '이전 대화를 불러오는 기능은 준비 중입니다.',
                  },
                ])
              }}
            >
              이전 대화 불러오기
            </button>

            <button
              className="bg-primary flex-1 rounded-lg px-3 py-2 text-sm text-white"
              onClick={() => {
                // 새 채팅 시작
                setView('chat')
                setMessages([
                  {
                    id: 1,
                    role: 'assistant',
                    content: '추가로 궁금한 점을 이어서 질문해 주세요.',
                  },
                ])
              }}
            >
              새 채팅하기
            </button>
          </div>
        </div>
      )}

      {/*일반 채팅 화면*/}
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
