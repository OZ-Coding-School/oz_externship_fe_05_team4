import { Avatar, AvatarImage } from '@/components/ui'
import profile from '@/assets/profile.png'
import type { Comment } from '@/schema/index'
import { format } from 'date-fns'
import { useAuthStore } from '@/store/auth.store'

export default function Comment({
  comment,
  questionId,
  answerId,
}: {
  comment: Comment
  questionId: number
  answerId: number
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-10 w-10 overflow-hidden rounded-full">
        <AvatarImage src={comment.author.profileImageUrl ?? profile} />
      </Avatar>

      <div className="flex grow flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-900">
            {comment.author.nickname}
          </span>
          <span className="text-sm text-gray-400">
            {format(comment.createdAt, 'yyyy년 MM월 dd일')}
          </span>
        </div>

        <p className="text-gray-800">{comment.content}</p>
      </div>
    </div>
  )
}

// TODO: 댓글 수정, 삭제
