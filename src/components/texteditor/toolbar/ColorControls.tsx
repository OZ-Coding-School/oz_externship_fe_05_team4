import type { Editor } from '@tiptap/core'
import { ChevronDown, Highlighter, Palette } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type Props = {
  editor: Editor
  textColor: string
  bgColor: string
  colorChips: readonly string[]
  bgChips: readonly string[]
  onTextColor: (c: string) => void
  onBgColor: (c: string) => void
}

export default function ColorControls({
  editor,
  textColor,
  bgColor,
  colorChips,
  bgChips,
  onTextColor,
  onBgColor,
}: Props) {
  void editor

  const chipBase = 'h-7 w-7 rounded border border-[#CECECE] shrink-0'
  const selectedRing = 'ring-2 ring-blue-500'

  return (
    <div className="flex items-center gap-2">
      {/* 배경 색 */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex h-8 shrink-0 items-center gap-2 rounded px-2 hover:bg-gray-100"
          >
            <Palette size={18} />
            <span
              className="h-4 w-4 rounded border border-[#CECECE]"
              style={{ backgroundColor: bgColor || '#FFFFFF' }}
            />
            <ChevronDown size={16} className="text-gray-600" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="z-50 rounded border bg-white p-2 shadow">
            <div className="flex gap-2">
              {bgChips.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={[chipBase, bgColor === c ? selectedRing : ''].join(
                    ' '
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => onBgColor(c)}
                />
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* 글자 색 */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex h-8 shrink-0 items-center gap-2 rounded px-2 hover:bg-gray-100"
          >
            <Highlighter size={18} />
            <span
              className="h-4 w-4 rounded border border-[#CECECE]"
              style={{ backgroundColor: textColor }}
            />
            <ChevronDown size={16} className="text-gray-600" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="z-50 rounded border bg-white p-2 shadow">
            <div className="flex gap-2">
              {colorChips.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={[
                    chipBase,
                    textColor === c ? selectedRing : '',
                  ].join(' ')}
                  style={{ backgroundColor: c }}
                  onClick={() => onTextColor(c)}
                />
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
