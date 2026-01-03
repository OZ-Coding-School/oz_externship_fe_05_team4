import chatbotIcon from '@/assets/chatbot.png'
import type { ChatMessageType } from '@/types'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  if (message.role === 'assistant') {
    return (
      <div className="flex items-start gap-2">
        {/* avatar */}
        <img src={chatbotIcon} alt="bot" className="h-8 w-8 rounded-full" />

        {/* bubble */}
        <div className="max-w-[75%] rounded-[12px] bg-[var(--color-chatbot-bot-bg)] px-4 py-3">
          <p className="text-[14px] leading-[1.6] text-[var(--color-gray-500)]">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  //유저 메시지
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] rounded-[12px] bg-[var(--color-chatbot-primary)] px-4 py-3">
        <p className="text-[14px] leading-[1.6] text-[var(--color-gray-100)]">
          {message.content}
        </p>
      </div>
    </div>
  )
}
