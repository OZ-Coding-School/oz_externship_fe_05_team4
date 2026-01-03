import type { Editor } from '@tiptap/core'
import { Eraser } from 'lucide-react'
import { IconBtn } from './ToolbarPrimitives'

export default function ClearControls({ editor }: { editor: Editor }) {
  return (
    <IconBtn
      onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
    >
      <Eraser size={18} />
    </IconBtn>
  )
}
