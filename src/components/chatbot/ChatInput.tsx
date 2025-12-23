import { useState } from 'react'

interface Props {
  onSend: (text: string) => void
}

export default function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="더 궁금한 것이 있다면 입력해 보세요."
        className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
      />
      <button
        onClick={handleSubmit}
        className="bg-primary rounded-md px-3 text-sm text-white"
      >
        전송
      </button>
    </div>
  )
}
