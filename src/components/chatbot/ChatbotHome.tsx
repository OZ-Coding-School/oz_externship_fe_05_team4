import { useEffect, useState } from 'react'
import chatbotIcon from '@/assets/chatbot.png'
import { X } from 'lucide-react'
import { getChatbotSessions, type ChatbotSessionItem } from '@/lib/chatbot'

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
  const [sessions, setSessions] = useState<ChatbotSessionItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChatbotSessions()
      .then(setSessions)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex h-[64px] items-center justify-center bg-[var(--color-chatbot-primary)] text-white">
        <div className="flex items-center gap-2">
          <img
            src={chatbotIcon}
            className="h-8 w-8 rounded-full bg-white p-1"
          />
          <span className="text-lg font-semibold">AI OZ</span>
        </div>
        <button onClick={onClose} className="absolute right-4">
          <X size={20} />
        </button>
      </header>

      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full rounded-[8px] bg-[var(--color-chatbot-primary)] py-3 text-white"
        >
          + 새 채팅
        </button>
      </div>

      <ul className="flex-1 divide-y overflow-y-auto px-4">
        {loading && <li className="py-6 text-center">불러오는 중…</li>}

        {!loading &&
          sessions.map((s) => (
            <li
              key={s.id}
              onClick={() => onSelectChat(s.question)}
              className="cursor-pointer py-4 hover:bg-gray-50"
            >
              <p className="text-sm font-medium">{s.title}</p>
              <p className="text-xs text-gray-400">{s.using_model}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}
