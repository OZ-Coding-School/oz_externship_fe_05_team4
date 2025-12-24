import { useState } from 'react'
import { X } from 'lucide-react'
import ChatbotLayout from './ChatbotLayout'
import botImage from '@/assets/chatbot.png'

export default function ChatbotFloatingButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <ChatbotLayout />}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-primary hover:bg-primary-400 fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
        aria-label="chatbot toggle"
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
