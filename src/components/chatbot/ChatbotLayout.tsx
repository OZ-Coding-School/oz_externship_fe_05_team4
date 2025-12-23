import { useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { Message } from '@/types'

export default function ChatbotLayout() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'ai',
      content: '안녕하세요. 무엇을 도와드릴까요?',
    },
  ])

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'user',
        content: text,
      },
    ])
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 w-[360px] overflow-hidden rounded-xl bg-white shadow-xl">
      {/* Header */}
      <div className="bg-primary flex h-14 items-center justify-center font-semibold text-white">
        AI OZ
      </div>

      {/* Messages */}
      <div className="h-[420px] overflow-y-auto p-4">
        <ChatMessageList messages={messages} />
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}
