import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useAdoptAnswer } from '@/hooks/useAnswerMutation'

const AnswerAdoptButton = ({
  questionId,
  answerId,
}: {
  questionId: number
  answerId: number
}) => {
  const { mutate: adoptAnswerMutate } = useAdoptAnswer()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary rounded-full px-6 py-5 text-sm text-white">
          채택하기
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader className="border-b border-gray-300 pb-2">
          <DialogTitle className="text-lg">답변 채택</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-600">
          이 답변을 채택하시면, 해당 질문의 채택 답변으로 설정됩니다.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => adoptAnswerMutate({ questionId, answerId })}
            className="text-sm"
          >
            채택하기
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="text-sm">
              취소
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AnswerAdoptButton
