import { EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/core'
import { TextView } from './TextView'

type Props = { editor: Editor | null }

const TextEditor = ({ editor }: Props) => {
  if (!editor) return null

  return <EditorContent editor={editor} className={TextView} />
}

export default TextEditor
