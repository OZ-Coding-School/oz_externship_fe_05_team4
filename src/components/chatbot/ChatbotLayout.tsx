import { useState } from 'react'
import ChatMessageList from './ChatMessageList'
import ChatInput from './ChatInput'
import type { ChatMessageType } from '@/types'

export default function ChatbotLayout() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 1,
      role: 'ai',
      content: '안녕하세요. 무엇을 도와드릴까요?',
    },
  ])

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', content: text },
    ])
  }

  return (
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl">
      <div className="bg-primary flex h-16 shrink-0 items-center justify-center text-[18px] font-semibold text-white">
        AI OZ
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <ChatMessageList messages={messages} />
      </div>

      <div className="shrink-0 border-t bg-white px-3 py-3">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}
