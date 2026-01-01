import { useState } from 'react'
import { Send } from 'lucide-react'

interface Props {
  onSend: (message: string) => Promise<void>
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!value.trim() || sending) return
    setSending(true)
    await onSend(value)
    setValue('')
    setSending(false)
  }

  return (
    <div className="rounded-xl border bg-gray-50 p-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
        rows={2}
        disabled={sending || disabled}
        className="w-full resize-none bg-transparent text-sm outline-none disabled:opacity-50"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{value.length}/1000</span>

        <button
          onClick={handleSend}
          disabled={sending || !value.trim()}
          className="text-primary disabled:text-gray-300"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
