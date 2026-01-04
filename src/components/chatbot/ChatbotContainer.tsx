import { useState } from 'react'
import ChatbotHome from './ChatbotHome'
import ChatbotLayout from './ChatbotLayout'
import type { ChatbotEntry } from '@/types'

export default function ChatbotContainer({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'home' | 'chat'>('home')
  const [entry, setEntry] = useState<ChatbotEntry>({ type: 'floating' })

  return (
    <div className="fixed right-6 bottom-24 z-[998] h-[560px] w-[360px]">
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
