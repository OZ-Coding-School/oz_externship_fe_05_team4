import type { Editor } from '@tiptap/core'
import { Group } from './ToolbarPrimitives'
import HistoryControls from './HistoryControls'
import FontControls from './FontControls'
import TextStyleControls from './TextStyleControls'
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

export default function DesktopToolbar({
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
  const rowOuter =
    'w-full overflow-x-auto overflow-y-hidden ' +
    '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
  const rowInner = 'mx-auto flex w-max items-center gap-1 px-4 py-1'

  return (
    <>
      <div className={rowOuter}>
        <div className={rowInner}>
          <Group>
            <HistoryControls editor={editor} />
          </Group>

          <Group>
            <FontControls
              font={font}
              size={size}
              fonts={fonts}
              sizes={sizes}
              onFontChange={onFontChange}
              onSizeChange={onSizeChange}
            />
          </Group>

          <Group>
            <TextStyleControls editor={editor} showStrike />
            <ColorControls
              editor={editor}
              textColor={textColor}
              bgColor={bgColor}
              colorChips={colorChips}
              bgChips={bgChips}
              onTextColor={onTextColor}
              onBgColor={onBgColor}
            />
          </Group>

          <Group withDivider={false}>
            <InsertControls
              onInsertLink={onInsertLink}
              onOpenImagePicker={onOpenImagePicker}
            />
          </Group>
        </div>
      </div>

      <div className={rowOuter}>
        <div className={rowInner}>
          <Group>
            <ListControls editor={editor} />
          </Group>

          <Group>
            <AlignControls editor={editor} />
          </Group>

          <Group>
            <LineHeightControls
              lineHeights={lineHeights}
              onSelect={onLineHeight}
            />
          </Group>

          <Group>
            <IndentControls editor={editor} />
          </Group>

          <Group withDivider={false}>
            <ClearControls editor={editor} />
          </Group>
        </div>
      </div>
    </>
  )
}
