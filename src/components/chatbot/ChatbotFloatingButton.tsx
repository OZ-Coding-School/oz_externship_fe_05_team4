import { useState } from 'react'
import { X } from 'lucide-react'
import ChatbotContainer from './ChatbotContainer'
import botImage from '@/assets/chatbot.png'

export default function ChatbotFloatingButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <ChatbotContainer
          initialEntry={{ type: 'floating' }}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-xl hover:bg-[var(--color-primary-400)]"
        aria-label="chatbot toggle"
      >
        {open ? (
          <X className="h-6 w-6 text-[var(--color-white)]" />
        ) : (
          <img src={botImage} alt="chatbot" className="h-7 w-7" />
        )}
      </button>
    </>
  )
}
