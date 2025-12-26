import { useMemo, useState } from 'react'
import { Button, Card, Input } from '@/components/ui'
import { CATEGORY_DATA } from '@/data/Category'
import CategorySelectGroup from '@/components/category/CategorySelectGroup'
import { MenuBar, TextEditor } from '@/components/texteditor'
import { useTextEditor } from '@/hooks'

const QuestionCreate = () => {
  const [content, setContent] = useState('')

  const editor = useTextEditor({
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const [mainCategory, setMainCategory] = useState<string>('')
  const [middleCategory, setMiddleCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')

  const mainOptions = CATEGORY_DATA

  const middleOptions = useMemo(() => {
    if (!mainCategory) return []
    return (
      CATEGORY_DATA.find((c) => c.name === mainCategory)?.subCategories ?? []
    )
  }, [mainCategory])

  const subOptions = useMemo(() => {
    if (!middleCategory) return []
    return middleOptions.find((c) => c.name === middleCategory)?.items ?? []
  }, [middleCategory, middleOptions])

  const handleMainChange = (value: string) => {
    setMainCategory(value)
    setMiddleCategory('')
    setSubCategory('')
  }

  const handleMiddleChange = (value: string) => {
    setMiddleCategory(value)
    setSubCategory('')
  }

  return (
    <div className="mx-auto flex w-full max-w-[944px] flex-col px-[24px] py-10">
      <h1 className="mb-2 text-2xl font-bold">질문 작성하기</h1>
      <div className="mb-6 h-[1px] w-full bg-[#CECECE]" />

      <Card className="flex w-full flex-col gap-4 rounded-[20px] border px-[38px] py-10">
        <div className="flex w-full gap-[12px]">
          {/* 대분류 */}
          <CategorySelectGroup
            placeholder="대분류 선택"
            options={mainOptions}
            value={mainCategory}
            onChange={handleMainChange}
          />

          {/* 중분류 */}
          <CategorySelectGroup
            placeholder="중분류 선택"
            options={middleOptions}
            value={middleCategory}
            onChange={handleMiddleChange}
            disabled={!mainCategory}
          />

          {/* 소분류 */}
          <CategorySelectGroup
            placeholder="소분류 선택"
            options={subOptions}
            value={subCategory}
            onChange={setSubCategory}
            disabled={!middleCategory}
          />
        </div>

        <Input
          className="h-[60px] w-full rounded-[4px] border border-[#ECECEC] bg-[#F7F2FF] px-[16px] py-[10px]"
          placeholder="제목을 입력하세요"
        />
      </Card>

      <div className="mt-5 w-full rounded-[20px] bg-[#ECECEC] p-[1px]">
        <div className="flex min-h-[677px] flex-col overflow-hidden rounded-[20px] bg-white">
          <div className="border-b border-[#ECECEC] bg-white">
            <MenuBar editor={editor} />
          </div>

          <div className="flex flex-1">
            <div className="w-1/2 overflow-y-auto border-r border-[#ECECEC] p-4">
              <TextEditor editor={editor} />
            </div>

            <div className="w-1/2 overflow-y-auto bg-[#FAFAFB] p-4">
              <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[32px] flex w-full justify-end">
        <Button>등록하기</Button>
      </div>
    </div>
  )
}

export default QuestionCreate
