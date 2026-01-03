import ChatMessage from './ChatMessage'
import type { ChatMessageType } from '@/types'

interface Props {
  messages: ChatMessageType[]
}

export default function ChatMessageList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  )
}
