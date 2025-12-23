import ChatMessage from './ChatMessage'
import type { Message } from '@/types'

interface Props {
  messages: Message[]
}

export default function ChatMessageList({ messages }: Props) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
      ))}
    </div>
  )
}
