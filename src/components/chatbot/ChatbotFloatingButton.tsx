import { useState } from 'react'
import { X } from 'lucide-react'
import botImage from '@/assets/chatbot.png'
import ChatbotContainer from './ChatbotContainer'

export default function ChatbotFloatingButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <ChatbotContainer onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-xl"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <img src={botImage} alt="chatbot" className="h-7 w-7" />
        )}
      </button>
    </>
  )
}
