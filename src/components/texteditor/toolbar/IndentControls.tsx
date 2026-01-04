import type { Editor } from '@tiptap/core'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { IconBtn } from './ToolbarPrimitives'

export default function IndentControls({ editor }: { editor: Editor }) {
  return (
    <>
      <IconBtn onClick={() => editor.commands.outdent()}>
        <ArrowLeft size={18} />
      </IconBtn>
      <IconBtn onClick={() => editor.commands.indent()}>
        <ArrowRight size={18} />
      </IconBtn>
    </>
  )
}
