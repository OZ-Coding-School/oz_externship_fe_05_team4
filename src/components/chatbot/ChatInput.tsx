import { useEffect, useRef, useState } from 'react'
import Message from '@/assets/Massage.png'

interface Props {
  disabled?: boolean
  onSend: (text: string) => void
}

export default function ChatInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  //자동 높이 조절
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`
  }, [value])

  const handleSubmit = () => {
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  return (
    <div className="relative min-h-[80px] rounded-[6px] border border-[var(--color-chatbot-input-border)] bg-[var(--color-white)] px-3 py-3">
      {/* textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
        className="block w-full resize-none bg-transparent text-[16px] leading-[24px] text-[var(--color-gray-400)] outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />

      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        <span className="text-xs text-[var(--color-primary)]">
          {value.length}
          <span className="text-[var(--color-gray-400)]">/1000</span>
        </span>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || value.length === 0}
          className="opacity-40 hover:opacity-60 disabled:opacity-20"
        >
          <img src={Message} alt="send" className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
