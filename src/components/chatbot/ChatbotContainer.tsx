import { useState } from 'react'
import ChatbotHome from './ChatbotHome'
import ChatbotLayout from './ChatbotLayout'
import type { ChatbotEntry } from '@/types'

type View = 'home' | 'chat'

export default function ChatbotContainer({
  initialEntry,
  onClose,
}: {
  initialEntry: ChatbotEntry
  onClose: () => void
}) {
  const [entry, setEntry] = useState<ChatbotEntry>(initialEntry)

  const [view, setView] = useState<View>(
    initialEntry.type === 'followup' ? 'chat' : 'home'
  )
  return (
    <div className="fixed right-6 bottom-24 z-[998] h-[560px] w-[360px] overflow-hidden rounded-[24px] bg-white shadow-2xl">
      {view === 'home' && (
        <ChatbotHome
          onClose={onClose}
          onNewChat={() => {
            setEntry({ type: 'floating' })
            setView('chat')
          }}
          onSelectChat={(questionId) => {
            setEntry({ type: 'followup', questionId })
            setView('chat')
          }}
        />
      )}

      {view === 'chat' && (
        <ChatbotLayout entry={entry} onBack={() => setView('home')} />
      )}
    </div>
  )
}
