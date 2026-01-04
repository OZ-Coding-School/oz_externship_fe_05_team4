import { useEffect, useRef, useState } from 'react'
import Message from '@/assets/Massage.png'

interface Props {
  disabled?: boolean
  onSend: (text: string) => void
}

const MAX_LENGTH = 1000

export default function ChatInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // textarea 자동 높이 조절
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`
  }, [value])

  const handleSubmit = () => {
    const text = value.trim()
    if (!text) return

    onSend(text)
    setValue('')
  }

  return (
    <div className="relative min-h-[80px] rounded-[6px] border border-[var(--color-gray-200)] bg-[var(--color-white)] px-3 py-3">
      {/* textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        disabled={disabled}
        maxLength={MAX_LENGTH}
        onChange={(e) => setValue(e.target.value)}
        placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
        className="block w-full resize-none bg-transparent text-[16px] leading-[24px] text-[var(--color-gray-700)] outline-none placeholder:text-[var(--color-gray-400)] disabled:text-[var(--color-gray-disabled)]"
        aria-label="메시지 입력"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />

      {/* footer */}
      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        <span className="text-xs text-[var(--color-primary)]">
          {value.length}
          <span className="text-[var(--color-gray-400)]">/{MAX_LENGTH}</span>
        </span>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || value.trim().length === 0}
          aria-label="메시지 전송"
          className="opacity-40 transition-opacity hover:opacity-70 disabled:opacity-20"
        >
          <img src={Message} alt="" className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
