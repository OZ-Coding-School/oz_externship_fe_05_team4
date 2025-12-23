import { useState } from 'react'
import ChatMessage from './ChatMessage'

export default function Chatbot() {
  const [messages] = useState([
    { id: 1, role: 'ai', content: '안녕하세요! 무엇을 도와드릴까요?' },
    { id: 2, role: 'user', content: '질문이 있어요' },
  ])

  return (
    <div className="fixed right-6 bottom-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-gray-primary text-sm font-semibold">
          AI 질문 도우미
        </h2>
        <button className="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      {/* Message list */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-100 px-4 py-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t px-3 py-2">
        <input
          placeholder="메시지를 입력하세요"
          className="focus:border-primary h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none"
        />
      </div>
    </div>
  )
}
