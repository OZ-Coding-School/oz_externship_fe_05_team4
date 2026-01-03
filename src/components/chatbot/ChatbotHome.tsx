import chatbotIcon from '@/assets/chatbot.png'
import { X } from 'lucide-react'

interface Props {
  onNewChat: () => void
  onClose: () => void
  onSelectChat: (questionId: number) => void
}

export default function ChatbotHome({
  onNewChat,
  onClose,
  onSelectChat,
}: Props) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <header className="relative flex h-[64px] items-center justify-center bg-[var(--color-chatbot-primary)] text-white">
        <div className="flex items-center gap-2">
          <img
            src={chatbotIcon}
            alt="AI OZ"
            className="h-8 w-8 rounded-full bg-white p-1"
          />
          <span className="text-lg font-semibold">AI OZ</span>
        </div>

        <button onClick={onClose} className="absolute right-4">
          <X size={20} />
        </button>
      </header>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[var(--color-chatbot-primary)] py-3 text-white"
        >
          + 새 채팅
        </button>
      </div>

      {/* List (임시) */}
      <ul className="flex-1 divide-y px-4">
        <li
          className="flex cursor-pointer items-center gap-3 py-4 hover:bg-[var(--color-gray-100)]"
          onClick={() => onSelectChat(7)} //테스트용
        >
          <img src={chatbotIcon} className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <p className="text-sm font-medium">AND 연산자 사용법</p>
            <p className="text-xs text-gray-400">방금</p>
          </div>
        </li>
      </ul>
    </div>
  )
}
