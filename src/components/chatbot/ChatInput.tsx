import { useState } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  return (
    <textarea
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
          e.preventDefault()
          if (!value.trim()) return
          onSend(value)
          setValue('')
        }
      }}
      placeholder={
        disabled
          ? '대화를 선택해 주세요'
          : '더 궁금한 것이 있다면 이어서 질문해 보세요.'
      }
      className={`focus:ring-primary/30 w-full resize-none rounded-full border px-4 py-2 text-sm transition-all duration-200 focus:ring-2 focus:outline-none ${
        disabled
          ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-70'
          : 'border-gray-200 opacity-100'
      }`}
    />
  )
}
