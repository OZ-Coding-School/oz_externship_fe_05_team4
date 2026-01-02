import { Button, Card, Textarea, Avatar, AvatarImage } from '@/components/ui'
import { ArrowUpDown, MessageCircle } from 'lucide-react'
import Comment from '@/components/common/Comment'
import type { Answer } from '@/schema/question.schema'
import type { User } from '@/types/user'
import { useAuthStore } from '@/store/auth.store'
import { timeAgo } from '@/utils/date'
import profile from '@/assets/profile.png'

export default function Answer({
  answer,
  user,
  questionAuthorId,
}: {
  answer: Answer
  user: User | null
  questionAuthorId: number
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  return (
    <Card className="flex flex-col gap-8 px-10 py-12">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 overflow-hidden rounded-full">
          <AvatarImage src={answer.author.profileImageUrl ?? profile} />
        </Avatar>

        <span className="grow px-4">{answer.author.nickname}</span>

        {/* TODO: 채택하기 API 연결 */}
        {isAuthenticated &&
          user?.id === questionAuthorId &&
          user.id !== answer.author.id && (
            <Button className="bg-primary rounded-full px-6 py-5 text-sm text-white">
              채택하기
            </Button>
          )}
      </div>

      {/* 답변 내용 */}
      <div className="mb-8 flex flex-col gap-8 border-b border-gray-200 py-4">
        {/* TODO: 텍스트 에디터 */}
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
            {/* TODO: form 으로? */}
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
          <Button variant="ghost" className="text-gray-600">
            최신순
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {answer.comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />
          })}
        </div>
      </div>
    </Card>
  )
}
