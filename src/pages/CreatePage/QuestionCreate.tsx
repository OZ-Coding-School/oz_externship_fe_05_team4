import { useState } from 'react'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { CATEGORY_DATA } from '@/data/Category'

const QuestionCreate = () => {
  const [mainCategory, setMainCategory] = useState<string>()
  const [middleCategory, setMiddleCategory] = useState<string>()
  const [subCategory, setSubCategory] = useState<string>()

  const middleOptions = mainCategory
    ? Object.keys(CATEGORY_DATA[mainCategory])
    : []
  const subOptions =
    mainCategory && middleCategory
      ? CATEGORY_DATA[mainCategory][middleCategory]
      : []

  return (
    <div className="flex w-full flex-col items-center py-10">
      <h1 className="mb-2 w-full max-w-[944px] text-2xl font-bold">
        질문 작성하기
      </h1>
      <div className="mb-6 h-[1px] w-full max-w-[944px] bg-[#CECECE]" />

      <Card className="flex w-full max-w-[944px] flex-col gap-4 rounded-[20px] border px-[38px] py-10">
        <div className="flex w-full gap-[12px]">
          {/* 대분류 */}
          <Select
            value={mainCategory}
            onValueChange={(value) => {
              setMainCategory(value)
              setMiddleCategory(undefined)
              setSubCategory(undefined)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="대분류 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CATEGORY_DATA).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 중분류 */}
          <Select
            key={mainCategory}
            value={middleCategory}
            onValueChange={(value) => {
              setMiddleCategory(value)
              setSubCategory(undefined)
            }}
            disabled={!mainCategory}
          >
            <SelectTrigger disabledBg={!mainCategory}>
              <SelectValue placeholder="중분류 선택" />
            </SelectTrigger>
            <SelectContent>
              {middleOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 소분류 */}
          <Select
            key={middleCategory}
            value={subCategory}
            onValueChange={setSubCategory}
            disabled={!middleCategory}
          >
            <SelectTrigger disabledBg={!middleCategory}>
              <SelectValue placeholder="소분류 선택" />
            </SelectTrigger>
            <SelectContent>
              {subOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          className="h-[60px] w-full rounded-[4px] border bg-[#F7F2FF] px-[16px] py-[10px]"
          placeholder="제목을 입력하세요"
        />
      </Card>

      <Card className="mt-5 flex min-h-[677px] w-full max-w-[944px] flex-col rounded-[20px]">
        <Card className="h-[80px] border-b">에디터 메뉴바</Card>

        <div className="flex flex-1">
          <Card className="flex flex-1 flex-col rounded-none border-r p-4">
            <Textarea
              className="flex-1 resize-none border-0 p-3 focus:ring-0"
              placeholder="내용을 입력해주세요"
            />
          </Card>

          <Card className="flex flex-1 flex-col rounded-none bg-[#FAFAFB] p-4">
            <Textarea
              className="flex-1 resize-none border-0 bg-transparent p-3 focus:ring-0"
              placeholder="내용을 입력해주세요"
            />
          </Card>
        </div>
      </Card>

      <div className="mt-[32px] flex w-full max-w-[944px] justify-end">
        <Button>등록하기</Button>
      </div>
    </div>
  )
}

export default QuestionCreate
