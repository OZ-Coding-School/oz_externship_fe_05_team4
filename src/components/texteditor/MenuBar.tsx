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
import { useState, useRef } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type MenuBarProps = {
  editor: Editor | null
  onUploadImages?: (files: File[]) => Promise<void>
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
      'flex h-8 w-8 shrink-0 items-center justify-center rounded',
      'hover:bg-gray-100',
      active ? 'bg-gray-100' : '',
      '[&>svg]:block', // svg 잘림 방지
    ].join(' ')}
  >
    {children}
  </button>
)

const Divider = () => <div className="mx-1 h-5 w-px shrink-0 bg-[#CECECE]" />

const fonts = [
  { label: '기본서체', value: '' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
]
const sizes = ['12', '14', '16', '18', '24', '32']

const colorChips = ['#111827', '#2563EB', '#DC2626', '#16A34A']
const bgChips = ['#DBEAFE', '#FEF3C7', '#DCFCE7', '#FCE7F3', '#FFFFFF']

const lineHeights = [
  { label: '1', value: '1' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
]

export default function MenuBar({ editor, onUploadImages }: MenuBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    editor.chain().focus().setHighlight({ color: c }).run()
  }

  const applyLineHeight = (v: string) => {
    editor.chain().focus().setLineHeight(v).run()
  }

  const insertLinkAsText = () => {
    const url = prompt('링크 URL을 입력하세요')
    if (!url) return
    const normalized = /^https?:\/\//i.test(url) ? url : url

    editor.chain().focus().insertContent(normalized).run()

    const { from } = editor.state.selection
    const start = from - normalized.length
    const end = from

    editor
      .chain()
      .focus()
      .setTextSelection({ from: start, to: end })
      .setLink({ href: normalized })
      .run()

    editor.chain().focus().setTextSelection(end).run()
  }

  const rowOuter =
    'w-full overflow-x-auto overflow-y-hidden ' +
    '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
  const rowInner = 'mx-auto flex w-max items-center gap-1 px-4 py-1'

  return (
    <div className="w-full bg-white py-2">
      <div className={rowOuter}>
        {/* 되돌리기, 앞돌리기*/}
        <div className={rowInner}>
          <IconBtn onClick={() => editor.chain().focus().undo().run()}>
            <RotateCcw size={18} />
          </IconBtn>
          <IconBtn onClick={() => editor.chain().focus().redo().run()}>
            <RotateCw size={18} />
          </IconBtn>

          <Divider />

          {/* 글꼴 */}
          <div className="relative shrink-0">
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
          <div className="relative shrink-0">
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

          {/* 굵기 */}
          <IconBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          >
            <Bold size={18} />
          </IconBtn>

          {/* 기울이기 */}
          <IconBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          >
            <Italic size={18} />
          </IconBtn>

          {/* 밑줄 */}
          <IconBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
          >
            <Underline size={18} />
          </IconBtn>

          {/* 취소선 */}
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
                className="flex h-8 shrink-0 items-center gap-2 rounded px-2 hover:bg-gray-100"
              >
                <Highlighter size={18} />
                <span
                  className="h-4 w-4 rounded border border-[#CECECE]"
                  style={{ backgroundColor: bgColor }}
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
                      className="h-7 w-7 rounded border border-[#CECECE]"
                      style={{ backgroundColor: c }}
                      onClick={() => applyBgColor(c)}
                    />
                  ))}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* 글자색 */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex h-8 shrink-0 items-center gap-2 rounded px-2 hover:bg-gray-100"
              >
                <Palette size={18} />
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
                      className="h-7 w-7 rounded border border-[#CECECE]"
                      style={{ backgroundColor: c }}
                      onClick={() => applyTextColor(c)}
                    />
                  ))}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Divider />

          {/* 링크 */}
          <IconBtn onClick={insertLinkAsText}>
            <LinkIcon size={18} />
          </IconBtn>

          {/* 이미지 */}
          <IconBtn onClick={() => fileInputRef.current?.click()}>
            <ImageIcon size={18} />
          </IconBtn>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? [])
              if (files.length === 0) return

              await onUploadImages?.(files)

              e.target.value = ''
            }}
          />
        </div>
      </div>

      <div className={rowOuter}>
        <div className={rowInner}>
          {/* 글머리 기호 */}
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

          {/* 정렬 */}
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
                      applyLineHeight(lh.value)
                    }}
                  >
                    줄 간격 {lh.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* 당겨쓰기 */}
          <IconBtn onClick={() => editor.commands.outdent()}>
            <ArrowLeft size={18} />
          </IconBtn>

          {/* 들여쓰기 */}
          <IconBtn onClick={() => editor.commands.indent()}>
            <ArrowRight size={18} />
          </IconBtn>

          {/* 모두 지우기 */}
          <IconBtn
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            <Eraser size={18} />
          </IconBtn>
        </div>
      </div>
    </div>
  )
}
