import { cn } from '@/lib/utils'
import type { ChatRole } from '@/types'

interface Props {
  role: ChatRole
  content: string
}

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === 'user'

  return (
    <div
      className={cn(
        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
        isUser
          ? 'bg-primary ml-auto text-white'
          : 'bg-white text-gray-700 shadow'
      )}
    >
      {content}
    </div>
  )
}
