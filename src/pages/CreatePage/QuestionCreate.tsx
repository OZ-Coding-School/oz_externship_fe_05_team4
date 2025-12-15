import Button from '@/components/common/Button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Card from '@/components/common/Card'

const QuestionCreate = () => {
  return (
    <div className="flex w-full flex-col items-center py-10">
      <h1 className="mb-2 w-full max-w-[944px] text-2xl font-bold">
        질문 작성하기
      </h1>

      <div className="mb-6 h-[1px] w-full max-w-[944px] bg-[#CECECE]" />

      <Card className="flex w-full max-w-[944px] flex-col gap-[10px] rounded-[20px] border pt-10 pr-[38px] pb-10 pl-[38px]">
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
              className="flex-1 resize-none rounded border-0 p-3 focus:ring-0"
              placeholder="내용을 입력해주세요"
            />
          </Card>

          <Card className="flex flex-1 flex-col rounded-none bg-[#FAFAFB] p-4">
            <Textarea
              className="flex-1 resize-none rounded border-0 bg-transparent p-3 focus:ring-0"
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
