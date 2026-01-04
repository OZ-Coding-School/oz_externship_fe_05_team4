import { MenuBar, TextEditor } from '@/components/texteditor'
import { useTextEditor } from '@/hooks/index'
import { uploadMultipleImages } from '@/utils/uploadMultipleImages'

const AnswerEditor = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  // 텍스트 에디터
  const editor = useTextEditor({
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
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
          {/* TODO: 텍스트 에디터 뷰어로 대체하기 */}
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      </div>
    </div>
  )
}

export default AnswerEditor
