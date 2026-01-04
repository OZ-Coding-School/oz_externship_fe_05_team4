import { Button, Card, Avatar, AvatarImage } from '@/components/ui'
import { ArrowUpDown, MessageCircle } from 'lucide-react'
import Comment from '@/components/comment/Comment'
import { type Answer } from '@/schema/index'
import { useAuthStore } from '@/store/auth.store'
import { timeAgo } from '@/utils/date'
import profile from '@/assets/profile.png'
import { cn } from '@/lib/utils'
import AnswerAdoptButton from './AnswerAdoptButton'
import CommentForm from '../comment/CommentForm'
import { useState } from 'react'

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

  const [isLatest, setIsLatest] = useState<boolean>(true)
  const sortedComments = isLatest
    ? [...answer.comments].reverse()
    : answer.comments

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
          <AnswerAdoptButton questionId={questionId} answerId={answer.id} />
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
        <CommentForm questionId={questionId} answerId={answer.id} />
      )}

      {/* 댓글 */}
      <div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-6 w-6 text-black" strokeWidth={2} />

            <h2 className="pl-1 font-semibold">
              댓글 {answer.comments.length}개{' '}
            </h2>
          </div>

          <Button
            variant="ghost"
            className="flex gap-2 text-gray-600"
            onClick={() => setIsLatest((prev) => !prev)}
          >
            <span>{isLatest ? '최신순' : '오래된 순'}</span>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {sortedComments.map((comment) => {
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
