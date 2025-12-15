import { useState } from 'react'

const tabs = [
  { id: 'all', label: '전체보기' },
  { id: 'done', label: '답변완료' },
  { id: 'waiting', label: '답변 대기중' },
]

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <nav className="flex gap-6 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-1 ${
            activeTab === tab.id
              ? 'border-b-2 border-[var(--color-primary)] font-semibold text-[var(--color-primary)]'
              : 'text-[var(--color-gray-400)]'
          } `}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
