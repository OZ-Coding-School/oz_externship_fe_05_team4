import { cn } from '@/lib/utils'

interface Props {
  role: 'ai' | 'user'
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
          : 'text-gray-primary bg-white shadow'
      )}
    >
      {content}
    </div>
  )
}
