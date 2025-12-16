import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = '질문 검색',
}: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-400)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus:border-primary h-10 w-full rounded-full border border-gray-200 bg-gray-100 px-10 text-sm outline-none"
      />
    </div>
  )
}
