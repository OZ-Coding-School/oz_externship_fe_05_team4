import type { Editor } from '@tiptap/core'
import { Bold, Italic, Underline, Strikethrough } from 'lucide-react'
import { IconBtn } from './ToolbarPrimitives'

export default function TextStyleControls({
  editor,
  showStrike = true,
}: {
  editor: Editor
  showStrike?: boolean
}) {
  return (
    <>
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

      {showStrike ? (
        <IconBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          <Strikethrough size={18} />
        </IconBtn>
      ) : null}
    </>
  )
}
