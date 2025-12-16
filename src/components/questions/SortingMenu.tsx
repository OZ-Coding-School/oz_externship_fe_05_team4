import { ArrowUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type SortOption = 'latest' | 'oldest'

interface SortMenuProps {
  sort: SortOption
  onChange: (value: SortOption) => void
}

export default function SortMenu({ sort, onChange }: SortMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-gray-primary)]">
          {sort === 'latest' ? '최신순' : '오래된 순'}
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[140px] rounded-2xl border border-[var(--color-gray-200)] bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      >
        <DropdownMenuItem
          className={cn(
            'cursor-pointer rounded-xl px-4 py-2 text-sm',
            sort === 'latest'
              ? 'bg-[var(--color-primary-50)] font-semibold text-[var(--color-primary)]'
              : 'text-[var(--color-gray-600)]'
          )}
          onClick={() => onChange('latest')}
        >
          최신순
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'cursor-pointer rounded-xl px-4 py-2 text-sm',
            sort === 'oldest'
              ? 'bg-[var(--color-primary-50)] font-semibold text-[var(--color-primary)]'
              : 'text-[var(--color-gray-600)]'
          )}
          onClick={() => onChange('oldest')}
        >
          오래된 순
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
