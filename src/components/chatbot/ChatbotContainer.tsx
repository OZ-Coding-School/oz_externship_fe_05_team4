import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMutation } from '@tanstack/react-query'
import ChatbotHome from './ChatbotHome'
import ChatbotLayout from './ChatbotLayout'
import { getSessionByQuestionId, createChatbotSession } from '@/lib/chatbot'
import { buildChatbotSummary } from '@/utils/chatbotSummary'

interface Props {
  questionId: number
  questionTitle: string
  onClose: () => void
}

export default function ChatbotContainer({
  questionId,
  questionTitle,
  onClose,
}: Props) {
  const [view, setView] = useState<'chat' | 'home'>('chat')
  const [sessionId, setSessionId] = useState<number | null>(null)
  const summary = buildChatbotSummary(questionTitle)
  const initializedRef = useRef(false)

  const createSessionMutation = useMutation({
    mutationFn: () =>
      createChatbotSession({
        question: questionId,
        title: summary,
        using_model: 'gemini-2.5-flash',
      }),
    onSuccess: (sid) => {
      setSessionId(sid)
    },
  })

  //플로팅 버튼 진입 시 단 1번만 세션 결정
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const init = async () => {
      const existing = await getSessionByQuestionId(questionId)

      if (existing) {
        setSessionId(existing)
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
        {view === 'chat' && (
          <ChatbotLayout
            questionId={questionId}
            sessionId={sessionId}
            onBack={() => setView('home')}
            onClose={onClose}
          />
        )}

        {view === 'home' && (
          <ChatbotHome
            questionId={questionId}
            onSelectSession={(sid: number) => {
              setSessionId(sid)
              setView('chat')
            }}
            onClose={onClose}
          />
        )}
      </div>
    </div>,
    document.body
  )
}
