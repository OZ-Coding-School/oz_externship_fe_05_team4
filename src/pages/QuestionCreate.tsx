import { useMemo, useState } from 'react'
import { Button, Card, Input } from '@/components/ui'
import { CATEGORY_DATA } from '@/data/Category'
import CategorySelectGroup from '@/components/category/CategorySelectGroup'
import { MenuBar, TextEditor } from '@/components/texteditor'
import { useTextEditor } from '@/hooks'
import { useQuestionCreate } from '@/hooks/useQuestionCreate'
import { useAuthStore } from '@/store'

const QuestionCreate = () => {
  // 로그인 확인
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  // 텍스트에디터
  const editor = useTextEditor({
    content: '',
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, content: editor.getHTML() }))
    },
  })

  // 카테고리
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

  const getSelectedCategoryId = () => {
    if (!mainCategory || !middleCategory || !subCategory) return null

    const main = CATEGORY_DATA.find((c) => c.name === mainCategory)
    const middle = main?.subCategories.find((c) => c.name === middleCategory)
    const sub = middle?.items.find((c) => c.name === subCategory)
    if (!sub) return null

    return Number(sub.id)
  }
  // 질문 등록 처리
  const [form, setForm] = useState({
    title: '',
    content: '',
    categoryId: null as number | null,
  })

  const { mutate, isPending } = useQuestionCreate()

  const handleSubmit = () => {
    const categoryId = getSelectedCategoryId()

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!form.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!categoryId) {
      alert('카테고리를 선택해주세요.')
      return
    }
    if (!form.content.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    // 서버로 질문데이터 전송
    mutate({
      title: form.title,
      content: form.content,
      category: categoryId,
    })
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
          name="title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
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
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[32px] flex w-full justify-end">
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? '등록 중..' : '등록하기'}
        </Button>
      </div>
    </div>
  )
}

export default QuestionCreate
