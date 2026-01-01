import { cn } from '@/lib/utils'
import type { ChatMessageType } from '@/types'
import botImage from '@/assets/chatbot.png'

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
          src={botImage}
          alt="AI"
          className="mr-2 h-8 w-8 shrink-0 rounded-full"
        />
      )}

      <div
        className={cn(
          'max-w-[260px] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
        )}
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
