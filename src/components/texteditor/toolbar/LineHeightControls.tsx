import { ChevronDown, ArrowUpDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type Props = {
  onSelect: (v: string) => void
  lineHeights: readonly { label: string; value: string }[]
}

export default function LineHeightControls({ onSelect, lineHeights }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex h-8 shrink-0 items-center gap-1 rounded px-2 hover:bg-gray-100"
        >
          <ArrowUpDown size={18} />
          <ChevronDown size={16} className="text-gray-600" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 rounded border bg-white p-1 shadow">
          {lineHeights.map((lh) => (
            <DropdownMenu.Item
              key={lh.value}
              className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100"
              onSelect={(e) => {
                e.preventDefault()
                onSelect(lh.value)
              }}
            >
              줄 간격 {lh.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
