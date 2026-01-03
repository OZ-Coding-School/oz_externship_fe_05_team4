import type { Editor } from '@tiptap/core'
import { ChevronDown, List } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export default function ListControls({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex h-8 shrink-0 items-center gap-1 rounded px-2 hover:bg-gray-100"
        >
          <List size={18} />
          <ChevronDown size={16} className="text-gray-600" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 rounded border bg-white p-1 shadow">
          <DropdownMenu.Item
            className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100"
            onSelect={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBulletList().run()
            }}
          >
            ● 글머리 기호
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100"
            onSelect={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleOrderedList().run()
            }}
          >
            1. 숫자 목록
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
