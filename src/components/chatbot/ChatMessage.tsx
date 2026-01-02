import { cn } from '@/lib/utils'
import type { ChatMessageType } from '@/types'
import chatbotIcon from '@/assets/chatbot.png'

export default function ChatMessage({
  role,
  content,
  status,
}: ChatMessageType) {
  const isUser = role === 'user'

  return (
    <div
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <img
          src={chatbotIcon}
          alt="AI"
          className="h-6 w-6 rounded-full bg-gray-100 p-0.5"
        />
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {status === 'loading' && (
          <span className="animate-pulse text-gray-400">
            AI가 답변을 작성 중입니다…
          </span>
        )}

        {status === 'error' && (
          <span className="text-red-500">답변을 불러오지 못했습니다.</span>
        )}

        {!status && content}
      </div>
    </div>
  )
}
