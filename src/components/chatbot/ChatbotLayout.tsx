import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
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
    <div className="fixed right-6 bottom-24 z-40 flex h-[560px] w-[360px] flex-col rounded-[24px] bg-white shadow-2xl">
      {/* Header */}
      <header className="bg-primary relative flex h-16 items-center justify-center rounded-t-[24px] text-[18px] font-semibold text-white">
        <button className="absolute left-4">
          <ChevronLeft size={20} />
        </button>
        AI OZ
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <ChatMessageList messages={messages} />
      </main>

      {/* Input */}
      <footer className="border-t bg-gray-50 px-4 py-3">
        <ChatInput onSend={handleSend} />
      </footer>
    </div>
  )
}
