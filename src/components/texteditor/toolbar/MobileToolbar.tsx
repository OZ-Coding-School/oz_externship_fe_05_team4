import type { Editor } from '@tiptap/core'
import { ChevronDown, MoreHorizontal, Strikethrough } from 'lucide-react'
import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Group, Hr, SectionTitle, Divider, IconBtn } from './ToolbarPrimitives'
import HistoryControls from './HistoryControls'
import TextStyleControls from './TextStyleControls'
import FontControls from './FontControls'
import ColorControls from './ColorControls'
import InsertControls from './InsertControls'
import ListControls from './ListControls'
import AlignControls from './AlignControls'
import LineHeightControls from './LineHeightControls'
import IndentControls from './IndentControls'
import ClearControls from './ClearControls'

type Props = {
  editor: Editor
  font: string
  size: string
  fonts: { label: string; value: string }[]
  sizes: readonly string[]
  textColor: string
  bgColor: string
  colorChips: readonly string[]
  bgChips: readonly string[]
  lineHeights: readonly { label: string; value: string }[]
  onFontChange: (v: string) => void
  onSizeChange: (v: string) => void
  onTextColor: (c: string) => void
  onBgColor: (c: string) => void
  onLineHeight: (v: string) => void
  onInsertLink: () => void
  onOpenImagePicker: () => void
}

export default function MobileToolbar({
  editor,
  font,
  size,
  fonts,
  sizes,
  textColor,
  bgColor,
  colorChips,
  bgChips,
  lineHeights,
  onFontChange,
  onSizeChange,
  onTextColor,
  onBgColor,
  onLineHeight,
  onInsertLink,
  onOpenImagePicker,
}: Props) {
  const [moreOpen, setMoreOpen] = useState(false)

  const handleInsertLink = () => {
    setMoreOpen(false)
    onInsertLink()
  }

  const handleOpenImagePicker = () => {
    setMoreOpen(false)
    onOpenImagePicker()
  }

  return (
    <div className="px-4 py-1">
      <div className="flex items-center gap-1">
        <Group>
          <HistoryControls editor={editor} />
        </Group>

        <Group>
          <TextStyleControls editor={editor} showStrike={false} />
        </Group>

        <Group withDivider={false}>
          <DropdownMenu.Root open={moreOpen} onOpenChange={setMoreOpen}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex h-8 shrink-0 items-center gap-1 rounded px-2 hover:bg-gray-100"
              >
                <MoreHorizontal size={18} />
                <ChevronDown size={16} className="text-gray-600" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-50 max-h-[70vh] w-[320px] overflow-y-auto rounded border bg-white p-2 shadow">
                <SectionTitle>폰트</SectionTitle>
                <div className="mt-1">
                  <FontControls
                    font={font}
                    size={size}
                    fonts={fonts}
                    sizes={sizes}
                    onFontChange={onFontChange}
                    onSizeChange={onSizeChange}
                  />
                </div>

                <Hr />

                <SectionTitle>스타일</SectionTitle>
                <div className="mt-1 flex items-center gap-1">
                  <IconBtn
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive('strike')}
                  >
                    <Strikethrough size={18} />
                  </IconBtn>
                </div>

                <div className="mt-2">
                  <ColorControls
                    editor={editor}
                    textColor={textColor}
                    bgColor={bgColor}
                    colorChips={colorChips}
                    bgChips={bgChips}
                    onTextColor={onTextColor}
                    onBgColor={onBgColor}
                  />
                </div>

                <Hr />

                <SectionTitle>삽입</SectionTitle>
                <div className="mt-1 flex items-center gap-1">
                  <InsertControls
                    onInsertLink={handleInsertLink}
                    onOpenImagePicker={handleOpenImagePicker}
                  />
                </div>

                <Hr />

                <SectionTitle>문단</SectionTitle>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <ListControls editor={editor} />
                  <LineHeightControls
                    lineHeights={lineHeights}
                    onSelect={onLineHeight}
                  />
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <AlignControls editor={editor} />
                </div>

                <Hr />

                <SectionTitle>들여쓰기 / 초기화</SectionTitle>
                <div className="mt-1 flex items-center gap-1">
                  <IndentControls editor={editor} />
                  <Divider />
                  <ClearControls editor={editor} />
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </Group>
      </div>
    </div>
  )
}
