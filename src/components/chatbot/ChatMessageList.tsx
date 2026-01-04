import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import type { ChatMessageType } from '@/types'

interface Props {
  messages: ChatMessageType[]
}

export default function ChatMessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    //메시지 갱신될 때마다 항상 아래로
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
