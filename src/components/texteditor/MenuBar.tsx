import type { Editor } from '@tiptap/core'
import {
  RotateCcw,
  RotateCw,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  Image as ImageIcon,
  Highlighter,
  Palette,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ArrowUpDown,
  Eraser,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type MenuBarProps = {
  editor: Editor | null
}

const IconBtn = ({
  onClick,
  active,
  children,
}: {
  onClick?: () => void
  active?: boolean
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'flex h-8 w-8 items-center justify-center rounded',
      'hover:bg-gray-100',
      active ? 'bg-gray-100' : '',
    ].join(' ')}
  >
    {children}
  </button>
)

const Divider = () => <div className="mx-2 h-5 w-px bg-gray-300" />

const fonts = [
  { label: '기본서체', value: '' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
]
const sizes = ['12', '14', '16', '18', '24', '32']

const colorChips = ['#111827', '#2563EB', '#DC2626', '#16A34A']
const bgChips = ['#ffffff', '#111827', '#2563EB', '#DC2626', '#16A34A']

const lineHeights = [
  { label: '1', value: '1' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
]

const MenuBar = ({ editor }: MenuBarProps) => {
  const [font, setFont] = useState('')
  const [size, setSize] = useState('16')
  const [textColor, setTextColor] = useState('#111827')
  const [bgColor, setBgColor] = useState('#DBEAFE')

  if (!editor) return null

  const applyFont = (v: string) => {
    setFont(v)
    if (!v) {
      editor.chain().focus().unsetFontFamily?.().run?.()
      return
    }
    editor.chain().focus().setFontFamily(v).run()
  }

  const applySize = (v: string) => {
    setSize(v)
    editor.chain().focus().setFontSize(`${v}px`).run()
  }

  const applyTextColor = (c: string) => {
    setTextColor(c)
    editor.chain().focus().setColor(c).run()
  }

  const applyBgColor = (c: string) => {
    setBgColor(c)
    editor.chain().focus().toggleHighlight({ color: c }).run()
  }

  const applyLineHeight = (v: string) => {
    editor.chain().focus().setLineHeight(v).run()
  }

  const insertLinkAsText = () => {
    const url = prompt('링크 URL을 입력하세요')
    if (!url) return

    const normalized = /^https?:\/\//i.test(url) ? url : `${url}`

    editor.chain().focus().insertContent(normalized).run()

    const { from } = editor.state.selection
    const to = from
    const start = to - normalized.length
    const end = to

    editor
      .chain()
      .focus()
      .setTextSelection({ from: start, to: end })
      .setLink({ href: normalized })
      .run()

    editor.chain().focus().setTextSelection(end).run()
  }

  return (
    <div className="bg-white px-3 py-2">
      {/* 되돌리기, 앞돌리기 */}
      <div className="flex items-center gap-1">
        <IconBtn onClick={() => editor.chain().focus().undo().run()}>
          <RotateCcw size={18} />
        </IconBtn>
        <IconBtn onClick={() => editor.chain().focus().redo().run()}>
          <RotateCw size={18} />
        </IconBtn>

        {/* 글꼴 */}
        <div className="relative">
          <select
            className="h-8 rounded bg-gray-100 px-3 pr-8 text-sm"
            value={font}
            onChange={(e) => applyFont(e.target.value)}
          >
            {fonts.map((f) => (
              <option key={f.label} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
          />
        </div>

        {/* 글자 크기 */}
        <div className="relative">
          <select
            className="h-8 w-20 rounded bg-gray-100 px-3 pr-8 text-sm"
            value={size}
            onChange={(e) => applySize(e.target.value)}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
          />
        </div>

        <Divider />

        <IconBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <Bold size={18} />
        </IconBtn>
        <IconBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <Italic size={18} />
        </IconBtn>
        <IconBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          <Underline size={18} />
        </IconBtn>
        <IconBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          <Strikethrough size={18} />
        </IconBtn>

        {/* 배경색 */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded px-2 hover:bg-gray-100"
            >
              <Highlighter size={18} />
              <span
                className="h-4 w-4 rounded border"
                style={{ backgroundColor: bgColor }}
              />
              <ChevronDown size={16} className="text-gray-600" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            className="rounded border bg-white p-2 shadow"
            align="start"
          >
            <div className="flex gap-2">
              {bgChips.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="h-6 w-6 rounded border"
                  style={{ backgroundColor: c }}
                  onClick={() => applyBgColor(c)}
                />
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* 글자색 드롭다운 */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded px-2 hover:bg-gray-100"
            >
              <Palette size={18} />
              <span
                className="h-4 w-4 rounded border"
                style={{ backgroundColor: textColor }}
              />
              <ChevronDown size={16} className="text-gray-600" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            className="rounded border bg-white p-2 shadow"
            align="start"
          >
            <div className="flex gap-2">
              {colorChips.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="h-6 w-6 rounded border"
                  style={{ backgroundColor: c }}
                  onClick={() => applyTextColor(c)}
                />
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Divider />

        {/* 링크 삽입 */}
        <IconBtn onClick={insertLinkAsText}>
          <LinkIcon size={18} />
        </IconBtn>

        {/* 이미지 삽입 */}
        <IconBtn
          onClick={() => {
            const url = prompt('이미지 URL을 입력하세요')
            if (!url) return
            editor.chain().focus().setImage({ src: url }).run()
          }}
        >
          <ImageIcon size={18} />
        </IconBtn>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        {/* 글머리 기호 */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="flex h-8 items-center gap-1 rounded px-2 hover:bg-gray-100"
            >
              <List size={18} />
              <ChevronDown size={16} className="text-gray-600" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="rounded border bg-white p-1 shadow">
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
        </DropdownMenu.Root>

        {/* 정렬 4개 */}
        <IconBtn
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
        >
          <AlignLeft size={18} />
        </IconBtn>
        <IconBtn
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
        >
          <AlignCenter size={18} />
        </IconBtn>
        <IconBtn
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
        >
          <AlignRight size={18} />
        </IconBtn>
        <IconBtn
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
        >
          <AlignJustify size={18} />
        </IconBtn>

        {/* 문단 간격 */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="flex h-8 items-center gap-1 rounded px-2 hover:bg-gray-100"
            >
              <ArrowUpDown size={18} />
              <ChevronDown size={16} className="text-gray-600" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="rounded border bg-white p-1 shadow">
            {lineHeights.map((lh) => (
              <DropdownMenu.Item
                key={lh.value}
                className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100"
                onSelect={(e) => {
                  e.preventDefault()
                  applyLineHeight(lh.value)
                }}
              >
                줄 간격 {lh.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* 들여쓰기, 당겨쓰기 */}
        <IconBtn onClick={() => editor.commands.outdent()}>
          <ArrowLeft size={18} />
        </IconBtn>
        <IconBtn onClick={() => editor.commands.indent()}>
          <ArrowRight size={18} />
        </IconBtn>

        {/* 서식 지우기 */}
        <IconBtn
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <Eraser size={18} />
        </IconBtn>
      </div>
    </div>
  )
}

export default MenuBar
