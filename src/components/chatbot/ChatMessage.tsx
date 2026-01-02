import type { ChatMessageType } from '@/types'
import chatbotIcon from '@/assets/chatbot.png'

export default function ChatMessage({ role, content }: ChatMessageType) {
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="mb-3 flex justify-end">
        <div className="bg-primary max-w-[240px] rounded-[18px] px-4 py-2 text-sm text-white">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mb-4">
      <img
        src={chatbotIcon}
        className="absolute top-0 left-0 h-6 w-6 rounded-full bg-white"
      />

      <div className="ml-8 max-w-[260px] rounded-[18px] bg-gray-100 px-4 py-2 text-sm text-gray-800">
        {content}
      </div>
    </div>
  )
}
