import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import type { ChatMessageType } from '@/types'

interface Props {
  messages: ChatMessageType[]
}

export default function ChatMessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const prevLengthRef = useRef(0)

  useEffect(() => {
    const isNewMessage = messages.length > prevLengthRef.current
    prevLengthRef.current = messages.length

    bottomRef.current?.scrollIntoView({
      behavior: isNewMessage ? 'smooth' : 'auto',
      block: 'end',
    })
  }, [messages])

  return (
    <div
      className="flex min-h-full flex-col gap-3 px-1"
      role="log"
      aria-live="polite"
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* scroll anchor */}
      <div ref={bottomRef} />
    </div>
  )
}
