import type { Editor } from '@tiptap/core'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'
import { IconBtn } from './ToolbarPrimitives'

export default function AlignControls({ editor }: { editor: Editor }) {
  return (
    <>
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
    </>
  )
}
