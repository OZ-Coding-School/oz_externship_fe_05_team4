import type { Editor } from '@tiptap/core'
import { useEffect, useRef, useState } from 'react'
import DesktopToolbar from './toolbar/DesktopToolbar'
import MobileToolbar from './toolbar/MobileToolbar'
import {
  bgChips,
  colorChips,
  fonts,
  lineHeights,
  sizes,
} from './toolbar/Constant'

type MenuBarProps = {
  editor: Editor | null
  onUploadImages?: (files: File[]) => Promise<void>
}

const DEFAULT_TEXT_COLOR = '#111827'
const DEFAULT_BG_COLOR = ''

export default function MenuBar({ editor, onUploadImages }: MenuBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [font, setFont] = useState('')
  const [size, setSize] = useState('16')
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR)
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR)

  useEffect(() => {
    if (!editor) return

    const sync = () => {
      const tc = (editor.getAttributes('textStyle')?.color as string) ?? ''
      const bc = (editor.getAttributes('highlight')?.color as string) ?? ''

      setTextColor(tc || DEFAULT_TEXT_COLOR)
      setBgColor(bc || DEFAULT_BG_COLOR)
    }

    sync()
    editor.on('selectionUpdate', sync)
    editor.on('transaction', sync)

    return () => {
      editor.off('selectionUpdate', sync)
      editor.off('transaction', sync)
    }
  }, [editor])

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
  const toggleTextColor = (c: string) => {
    const current = (editor.getAttributes('textStyle')?.color as string) ?? ''

    if (current === c) {
      editor.chain().focus().unsetColor().run()
      setTextColor(DEFAULT_TEXT_COLOR)
      return
    }

    editor.chain().focus().setColor(c).run()
    setTextColor(c)
  }

  const toggleBgColor = (c: string) => {
    const current = (editor.getAttributes('highlight')?.color as string) ?? ''

    if (current === c) {
      editor.chain().focus().unsetHighlight().run()
      setBgColor(DEFAULT_BG_COLOR)
      return
    }

    editor.chain().focus().setHighlight({ color: c }).run()
    setBgColor(c)
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

  const openImagePicker = () => fileInputRef.current?.click()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return

    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
    const invalid = files.find((file) => !allowed.includes(file.type))
    if (invalid) {
      alert('png/jpg/webp/gif만 업로드 가능')
      e.target.value = ''
      return
    }

    await onUploadImages?.(files)
    e.target.value = ''
  }

  const sharedProps = {
    editor,
    font,
    size,
    fonts: [...fonts],
    sizes,
    textColor,
    bgColor,
    colorChips,
    bgChips,
    lineHeights,
    onFontChange: applyFont,
    onSizeChange: applySize,

    onTextColor: toggleTextColor,
    onBgColor: toggleBgColor,

    onLineHeight: applyLineHeight,
    onInsertLink: insertLinkAsText,
    onOpenImagePicker: openImagePicker,
  }

  return (
    <div className="w-full bg-white py-2">
      <div className="md:hidden">
        <MobileToolbar {...sharedProps} />
      </div>

      <div className="hidden md:block">
        <DesktopToolbar {...sharedProps} />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
