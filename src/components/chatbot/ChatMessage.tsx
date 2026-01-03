import chatbotIcon from '@/assets/chatbot.png'
import type { ChatMessageType } from '@/types'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const isLoading = message.status === 'loading'

  //완전 빈 메시지는 렌더링하지 않음 (로딩은 예외)
  if (!message.content && !isLoading) return null

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : ''}`}>
      {/* bot avatar */}
      {!isUser && (
        <img
          src={chatbotIcon}
          alt="bot"
          className="h-8 w-8 rounded-full bg-white p-1 shadow"
        />
      )}

      <div
        className={`max-w-[240px] rounded-[16px] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-[var(--color-chatbot-user-bubble)] text-[var(--color-chatbot-user-text)]'
            : 'bg-[var(--color-chatbot-bot-bubble)] text-[var(--color-chatbot-bot-text)]'
        }`}
      >
        {isAssistant && isLoading && !message.content ? (
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
          </span>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}
