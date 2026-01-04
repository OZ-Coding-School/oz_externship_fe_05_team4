import {
  Button,
  Card,
  Textarea,
  Avatar,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui'
import { ArrowUpDown, MessageCircle } from 'lucide-react'
import Comment from '@/components/common/Comment'
import type { Answer } from '@/schema/index'
import { useAuthStore } from '@/store/auth.store'
import { timeAgo } from '@/utils/date'
import profile from '@/assets/profile.png'
import { useAdoptAnswer } from '@/hooks/useAnswerMutation'
import { DialogDescription } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

export default function Answer({
  answer,
  questionId,
  questionAuthorId,
  hasAdoptedAnswer,
}: {
  answer: Answer
  questionId: number
  questionAuthorId: number
  hasAdoptedAnswer: boolean
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const user = useAuthStore((state) => state.user)

  const { mutate: adoptAnswerMutate } = useAdoptAnswer()

  const isAdoptable =
    !hasAdoptedAnswer &&
    isAuthenticated &&
    user?.id === questionAuthorId &&
    user?.id !== answer.author.id

  return (
    <Card
      className={cn(
        'flex flex-col gap-8 px-10 py-12',
        answer.isAdopted && 'border-primary relative'
      )}
    >
      <div className="bg-primary absolute -top-4 left-10 rounded-full px-4 py-2 text-sm text-white">
        질문자 채택
      </div>

      {/* 답변 헤더 */}
      <div className="flex items-center">
        <Avatar className="h-10 w-10 overflow-hidden rounded-full">
          <AvatarImage src={answer.author.profileImageUrl ?? profile} />
        </Avatar>

        <span className="grow px-4">{answer.author.nickname}</span>

        {/* 답변 채택 하기 */}
        {isAdoptable && (
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
                  onClick={() =>
                    adoptAnswerMutate({ questionId, answerId: answer.id })
                  }
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
        )}
      </div>

      {/* 답변 내용 */}
      <div className="mb-8 flex flex-col gap-8 border-b border-gray-200 py-4">
        {/* TODO: 텍스트 에디터 뷰어 */}
        <div className="rounded-lg bg-gray-50 py-8 whitespace-pre-wrap">
          {answer.content}
        </div>

        <span className="self-end text-sm text-gray-400">
          {timeAgo(answer.createdAt)}
        </span>
      </div>

      {/* 댓글 입력 */}
      {isAuthenticated && (
        <div className="text-right text-sm text-gray-400">
          <div className="relative">
            {/* TODO: 댓글 등록 API 연결 (form 으로?) */}
            <Textarea
              rows={5}
              className="w-full border border-gray-300 px-6 py-4 text-sm"
              placeholder="개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
            />
            <Button className="absolute right-3 bottom-3 rounded-full bg-gray-200 px-5 py-2 text-sm text-black">
              등록
            </Button>
          </div>
        </div>
      )}

      {/* 댓글 */}
      <div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <MessageCircle className="h-6 w-6 text-black" strokeWidth={2.5} />

            <h2 className="pl-1 font-semibold">
              댓글 {answer.comments.length}개{' '}
            </h2>
          </div>
          {/* TODO: 댓글 정렬 버튼 (최신순, 오래된 순) */}
          <Button variant="ghost" className="flex gap-2 text-gray-600">
            <span>최신순</span>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {answer.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                questionId={questionId}
                answerId={answer.id}
              />
            )
          })}
        </div>
      </div>
    </Card>
  )
}

// TODO: 답변 삭제
