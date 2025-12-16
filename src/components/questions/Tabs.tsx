import { cn } from '@/lib/utils'

const tabs = [
  { id: 'all', label: '전체보기' },
  { id: 'done', label: '답변완료' },
  { id: 'waiting', label: '답변 대기중' },
] as const

export type TabId = (typeof tabs)[number]['id']

interface TabsProps {
  value: TabId
  onChange: (id: TabId) => void
}

export default function Tabs({ value, onChange }: TabsProps) {
  return (
    <section className="mb-4 flex items-center gap-6 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'pb-1',
            value === tab.id
              ? 'border-b-2 border-[var(--color-primary)] font-semibold text-[var(--color-primary)]'
              : 'text-[var(--color-gray-500)]'
          )}
        >
          {tab.label}
        </button>
      ))}
    </section>
  )
}
