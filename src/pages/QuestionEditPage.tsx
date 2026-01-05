import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

import { Button, Card, Input } from '@/components/ui'
import { CATEGORY_DATA } from '@/constants/Category'
import CategorySelectGroup from '@/components/category/CategorySelectGroup'
import { MenuBar, TextEditor } from '@/components/texteditor'
import { useTextEditor } from '@/hooks'

import { getQuestionDetail, patchQuestion } from '@/api/QuestionEdit.api'
import { findNamesBySubId, findSubIdByNames, getErrorMessage } from '@/utils'
import { queryKeys } from '@/constants'
import type { QuestionEditForm } from '@/schema/question.schema'

type Params = {
  id?: string
  questionId?: string
  question_id?: string
}

const QuestionEditPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const params = useParams() as Params
  const rawId = params.question_id ?? params.questionId ?? params.id
  const questionId = Number(rawId)

  const [form, setForm] = useState({
    title: '',
    content: '',
    categoryId: null as number | null,
  })

  const [mainCategory, setMainCategory] = useState<string>('')
  const [middleCategory, setMiddleCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const editor = useTextEditor({
    content: '',
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, content: editor.getHTML() }))
    },
  })

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

  useEffect(() => {
    if (!rawId || Number.isNaN(questionId)) {
      setIsLoading(false)
      setErrorMessage('잘못된 질문 ID 입니다.')
      return
    }
    if (!editor) return

    let cancelled = false

    ;(async () => {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const detail = await getQuestionDetail(questionId)
        if (cancelled) return

        setForm({
          title: detail.title ?? '',
          content: detail.content ?? '',
          categoryId: detail.category?.id ?? null,
        })

        editor.commands.setContent(detail.content ?? '', { emitUpdate: false })

        if (detail.category?.id) {
          const mapped = findNamesBySubId(detail.category.id)
          if (mapped) {
            setMainCategory(mapped.mainName)
            setMiddleCategory(mapped.middleName)
            setSubCategory(mapped.subName)
          }
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setErrorMessage(getErrorMessage(e, '질문 불러오기에 실패했습니다.'))
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [rawId, questionId, editor])

  const onSubmit = async () => {
    if (!rawId || Number.isNaN(questionId)) {
      setErrorMessage('잘못된 질문 ID 입니다.')
      return
    }

    const trimmedTitle = form.title.trim()
    const trimmedContent = form.content.trim()

    if (!trimmedTitle) {
      setErrorMessage('제목을 입력해주세요.')
      return
    }
    if (!trimmedContent) {
      setErrorMessage('내용을 입력해주세요.')
      return
    }
    if (!mainCategory || !middleCategory || !subCategory) {
      setErrorMessage('카테고리를 모두 선택해주세요.')
      return
    }

    const categoryId = findSubIdByNames(
      mainCategory,
      middleCategory,
      subCategory
    )
    if (categoryId === null) {
      setErrorMessage('카테고리 ID 매핑에 실패했습니다.')
      return
    }

    try {
      setIsSaving(true)
      setErrorMessage('')

      const body: QuestionEditForm = {
        title: trimmedTitle,
        content: trimmedContent,
        category: categoryId,
      }

      await patchQuestion(questionId, body)

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.detail(questionId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.list(),
        }),
      ])

      navigate(`/Question/Detail/${questionId}`, { replace: true })
    } catch (e: unknown) {
      setErrorMessage(getErrorMessage(e, '질문 수정에 실패했습니다.'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[944px] flex-col px-[24px] py-10">
      <h1 className="mb-2 text-2xl font-bold">질문 수정하기</h1>
      <div className="mb-6 h-[1px] w-full bg-[#CECECE]" />

      {errorMessage && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <Card className="flex w-full flex-col gap-4 rounded-[20px] border px-[38px] py-10">
        <div className="flex w-full gap-[12px]">
          <CategorySelectGroup
            placeholder="대분류 선택"
            options={mainOptions}
            value={mainCategory}
            onChange={handleMainChange}
            disabled={isLoading}
          />

          <CategorySelectGroup
            placeholder="중분류 선택"
            options={middleOptions}
            value={middleCategory}
            onChange={handleMiddleChange}
            disabled={isLoading || !mainCategory}
          />

          <CategorySelectGroup
            placeholder="소분류 선택"
            options={subOptions}
            value={subCategory}
            onChange={(value) => {
              setSubCategory(value)
              const selectedId = findSubIdByNames(
                mainCategory,
                middleCategory,
                value
              )
              setForm((prev) => ({ ...prev, categoryId: selectedId }))
            }}
            disabled={isLoading || !middleCategory}
          />
        </div>

        <Input
          name="title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          className="h-[60px] w-full rounded-[4px] border border-[#ECECEC] bg-[#F7F2FF] px-[16px] py-[10px]"
          placeholder={isLoading ? '불러오는 중...' : '제목을 입력하세요'}
          disabled={isLoading}
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
        <Button onClick={onSubmit} disabled={isLoading || isSaving}>
          {isSaving ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  )
}

export default QuestionEditPage
