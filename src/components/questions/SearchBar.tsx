import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const [focused, setFocused] = useState(false)

  return (
    <div
      className={cn(
        'relative flex h-[56px] w-full max-w-[720px] items-center rounded-full border-2 bg-white transition',
        focused ? 'border-primary' : 'border-gray-200'
      )}
    >
      {/* 검색 아이콘 */}
      <Search className="ml-6 h-5 w-5 text-gray-400" />

      {/* 인풋 */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-4 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
      />

      {/* 초기화 버튼 */}
      {focused && value && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onChange('')}
          className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
          aria-label="clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
