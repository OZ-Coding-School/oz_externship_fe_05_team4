import chatbotIcon from '@/assets/chatbot.png'
import type { ChatMessageType } from '@/types'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const isLoading = message.status === 'loading'

  // 완전히 빈 메시지는 렌더링하지 않음 (로딩은 예외)
  if (!message.content && !isLoading) return null

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <img
          src={chatbotIcon}
          alt="AI 챗봇"
          className="h-8 w-8 rounded-full bg-white p-1 shadow"
        />
      )}

      {/* Message Bubble */}
      <div
        role="status"
        aria-live={isAssistant && isLoading ? 'polite' : undefined}
        className={`max-w-[240px] rounded-[16px] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-[var(--color-chatbot-primary)] text-[var(--color-chatbot-text)]'
            : 'bg-[var(--color-chatbot-bot-bg)] text-[var(--color-gray-700)]'
        } `}
      >
        {isAssistant && isLoading && !message.content ? (
          <span className="inline-flex items-center gap-1">
            <span className="chatbot-dot" />
            <span className="chatbot-dot animation-delay-200" />
            <span className="chatbot-dot animation-delay-400" />
          </span>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}
