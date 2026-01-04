import { Button, Textarea } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CommentEditFormSchema,
  type Comment,
  type CommentEditForm,
} from '@/schema/index'
import { useEditComment } from '@/hooks/useCommentMutation'
import type { Dispatch, SetStateAction } from 'react'

const CommentEdit = ({
  questionId,
  answerId,
  myComment,
  setIsEditing,
}: {
  questionId: number
  answerId: number
  myComment: Comment
  setIsEditing: Dispatch<SetStateAction<boolean>>
}) => {
  const { mutateAsync, isPending } = useEditComment()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors }, // validation 처리를 굳이 안함 (빈 텍스트시 등록 버튼 비활성화)
  } = useForm<CommentEditForm>({
    resolver: zodResolver(CommentEditFormSchema),
    defaultValues: {
      content: '',
    },
  })

  const content = watch('content')

  const onSubmit = async (data: CommentEditForm) => {
    await mutateAsync({
      questionId,
      answerId,
      commentId: myComment.id,
      comment: data,
    })
    reset()
    setIsEditing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <Textarea
        {...register('content')}
        className="field-sizing-content min-h-16 w-full resize-none border border-gray-300 px-4 py-2 text-sm focus:ring-[0.5px]"
        placeholder="개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
      />
      <Button
        type="submit"
        disabled={!content?.trim() || isPending}
        className="bg-primary-200 text-primary border-primary hover:bg-primary absolute right-3 bottom-3 rounded-full border px-5 py-2 text-sm transition-all duration-200 hover:text-white"
      >
        등록
      </Button>
    </form>
  )
}

export default CommentEdit
