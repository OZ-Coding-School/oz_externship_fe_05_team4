import { useState } from 'react'
import { X } from 'lucide-react'
import botImage from '@/assets/chatbot.png'
import ChatbotContainer from './ChatbotContainer'

interface Props {
  questionId: number
  questionTitle: string
}

export default function ChatbotFloatingButton({
  questionId,
  questionTitle,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 챗봇 컨테이너 */}
      {open && (
        <ChatbotContainer
          questionId={questionId}
          questionTitle={questionTitle}
          onClose={() => setOpen(false)}
        />
      )}

      {/* 플로팅 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-xl transition-transform hover:scale-105 active:scale-95"
        aria-label="AI 챗봇 열기"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <img
            src={botImage}
            alt="chatbot"
            className="h-7 w-7"
            draggable={false}
          />
        )}
      </button>
    </>
  )
}
