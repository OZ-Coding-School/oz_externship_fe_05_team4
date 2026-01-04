import {
  AnswerCreateFormSchema,
  type Answer,
  type AnswerCreateForm,
  type Author,
} from '@/schema/index'
import { type Dispatch, type SetStateAction } from 'react'
import { useEditAnswer } from '@/hooks/useAnswerMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button, Card } from '@/components/ui/index'
import profile from '@/assets/profile.png'
import AnswerEditor from '@/components/answer/AnswerEditor'

const AnswerEdit = ({
  questionId,
  answerId,
  questionAuthor,
  myAnswer,
  setIsEditingAnswer,
}: {
  questionId: number
  answerId: number
  questionAuthor: Author
  myAnswer: Answer
  setIsEditingAnswer: Dispatch<SetStateAction<boolean>>
}) => {
  const { mutateAsync, isPending } = useEditAnswer()

  const { control, handleSubmit, watch } = useForm<AnswerCreateForm>({
    resolver: zodResolver(AnswerCreateFormSchema),
    defaultValues: {
      content: myAnswer.content,
    },
  })

  const content = watch('content')

  const onSubmit = async (data: AnswerCreateForm) => {
    await mutateAsync({ questionId, answerId, answer: data })
    setIsEditingAnswer(false)
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-3xl border-gray-200">
      <div className="flex items-center gap-4 p-10">
        <Avatar className="h-12 w-12 overflow-hidden rounded-full">
          <AvatarImage src={questionAuthor.profileImageUrl ?? profile} />
        </Avatar>

        <div className="flex grow flex-col">
          <span className="text-primary text-sm font-medium">
            {questionAuthor.nickname} 님,
          </span>
          <span className="font-semibold text-gray-800">
            정보를 공유해 주세요.
          </span>
        </div>

        <Button
          type="submit"
          form="answer-form"
          disabled={isPending || !content?.trim()}
          className="bg-primary rounded-full px-8 py-6 text-lg font-medium text-white hover:bg-violet-900"
        >
          {isPending ? '등록 중' : '등록하기'}
        </Button>
      </div>

      <form id="answer-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <AnswerEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </form>
    </Card>
  )
}

export default AnswerEdit
