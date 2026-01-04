import type { Editor } from '@tiptap/core'
import { RotateCcw, RotateCw } from 'lucide-react'
import { IconBtn } from './ToolbarPrimitives'

export default function HistoryControls({ editor }: { editor: Editor }) {
  return (
    <>
      <IconBtn onClick={() => editor.chain().focus().undo().run()}>
        <RotateCcw size={18} />
      </IconBtn>
      <IconBtn onClick={() => editor.chain().focus().redo().run()}>
        <RotateCw size={18} />
      </IconBtn>
    </>
  )
}
