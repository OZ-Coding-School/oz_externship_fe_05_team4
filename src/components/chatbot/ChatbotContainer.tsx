import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMutation } from '@tanstack/react-query'
import ChatbotHome from './ChatbotHome'
import ChatbotLayout from './ChatbotLayout'
import type { ChatbotEntry } from '@/types'
import { getSessionByQuestionId, createChatbotSession } from '@/lib/chatbot'

interface Props {
  questionId: number
  onClose: () => void
}

export default function ChatbotContainer({ questionId, onClose }: Props) {
  const [view, setView] = useState<'home' | 'chat'>('chat')
  const [sessionId, setSessionId] = useState<number | null>(null)

  //최초 진입 여부
  const hasInitialized = useRef(false)

  const entry: ChatbotEntry = {
    questionId,
    type: 'floating',
  }

  const createSessionMutation = useMutation({
    mutationFn: () =>
      createChatbotSession({
        question: questionId,
        title: 'AI 질문',
        using_model: 'gpt-4',
      }),
    onSuccess: (sid) => {
      setSessionId(sid)
      setView('chat')
    },
  })

  //최초 플로팅 진입 시에만 실행
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const init = async () => {
      const existing = await getSessionByQuestionId(questionId)
      if (existing) {
        setSessionId(existing)
        setView('chat')
        return
      }
      createSessionMutation.mutate()
    }

    init()
  }, [questionId, createSessionMutation])

  if (!sessionId) return null

  return createPortal(
    <div className="fixed right-6 bottom-24 z-[9999]">
      <div className="h-[560px] w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {view === 'home' && (
          <ChatbotHome
            questionId={questionId}
            onClose={onClose}
            onSelectSession={(sid: number) => {
              setSessionId(sid)
              setView('chat')
            }}
          />
        )}

        {view === 'chat' && (
          <ChatbotLayout
            entry={entry}
            sessionId={sessionId}
            onBack={() => setView('home')}
            onClose={onClose}
          />
        )}
      </div>
    </div>,
    document.body
  )
}
