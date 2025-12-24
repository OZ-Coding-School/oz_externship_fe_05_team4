import { useState } from 'react'
import { Send } from 'lucide-react'

interface Props {
  onSend: (message: string) => void
}

export default function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  return (
    <div className="rounded-xl border bg-gray-50 p-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
        rows={2}
        className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-400"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{value.length}/1000</span>

        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className="text-primary disabled:text-gray-300"
          aria-label="send"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
