import { useState } from 'react'
import { MenuBar, TextEditor } from '@/components/texteditor'
import { useTextEditor } from '@/hooks/index'
import { uploadMultipleImages } from '@/utils/uploadMultipleImages'

const AnswerEditor = () => {
  const [content, setContent] = useState<{
    title: string
    content: string
    categoryId: number | null
  }>({
    title: '',
    content: '',
    categoryId: null,
  })

  // 텍스트에디터
  const editor = useTextEditor({
    content: '',
    onUpdate: ({ editor }) => {
      setContent((prev) => ({ ...prev, content: editor.getHTML() }))
    },
  })

  // 이미지
  const handleUploadImages = async (files: File[]) => {
    const imgUrls = await uploadMultipleImages(files)
    imgUrls.forEach((url) =>
      editor?.chain().focus().setImage({ src: url }).run()
    )
  }

  return (
    <div className="flex min-h-[677px] flex-col border border-gray-200 bg-white">
      <div className="border-b border-[#ECECEC] bg-white">
        <MenuBar editor={editor} onUploadImages={handleUploadImages} />
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 overflow-y-auto border-r border-[#ECECEC] p-4">
          <TextEditor editor={editor} />
        </div>

        <div className="w-1/2 overflow-y-auto bg-[#FAFAFB] p-4">
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>
      </div>
    </div>
  )
}

export default AnswerEditor
