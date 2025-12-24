import { EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/core'

type Props = {
  editor: Editor | null
}

const TextEditor = ({ editor }: Props) => {
  if (!editor) return null

  return (
    <EditorContent
      editor={editor}
      className="prose max-w-none [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
    />
  )
}

export default TextEditor
