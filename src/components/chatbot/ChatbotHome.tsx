import chatbotIcon from '@/assets/chatbot.png'
import { X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getChatbotSessions, type ChatbotSessionItem } from '@/lib/chatbot'
import { queryKeys } from '@/data/queryKeys'

interface Props {
  questionId: number
  onClose: () => void
  onSelectSession: (sessionId: number) => void
}

export default function ChatbotHome({
  questionId,
  onClose,
  onSelectSession,
}: Props) {
  const { data: sessions = [], isLoading } = useQuery<ChatbotSessionItem[]>({
    queryKey: queryKeys.aiChatsList(questionId),
    queryFn: async () => {
      const all = await getChatbotSessions(questionId)
      return all
    },
  })

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

      <ul className="flex-1 divide-y overflow-y-auto px-4">
        {isLoading && <li className="py-6 text-center">불러오는 중…</li>}

        {!isLoading &&
          sessions.map((s) => (
            <li
              key={s.id}
              onClick={() => onSelectSession(s.id)}
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
