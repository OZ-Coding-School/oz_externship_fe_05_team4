import { Avatar, AvatarImage, Button } from '@/components/ui'
import profile from '@/assets/profile.png'
import type { Comment } from '@/schema/index'
import { format } from 'date-fns'
import { useAuthStore } from '@/store/auth.store'
import { useDeleteComment } from '@/hooks/useCommentMutation'
import { useState } from 'react'
import CommentEdit from '@/components/comment/CommentEdit'

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

  const [isEditing, setIsEditing] = useState<boolean>(false)

  // 댓글 삭제
  const { mutate: deleteMutate } = useDeleteComment()

  const handleDelete = () => {
    deleteMutate({ questionId, answerId, commentId: comment.id })
  }

  const isMine = isAuthenticated && user?.id === comment.author.id

  return (
    <div className="flex gap-6">
      <Avatar className="selfoverflow-hidden my-2 h-10 w-10 rounded-full">
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

        {isEditing ? (
          <CommentEdit
            questionId={questionId}
            answerId={answerId}
            myComment={comment}
            setIsEditing={setIsEditing}
          />
        ) : (
          <p className="whitespace-pre-line text-gray-800">{comment.content}</p>
        )}
      </div>

      {isMine && !isEditing && (
        <div className="flex flex-col gap-1 py-0.5">
          <Button
            variant="ghost"
            className="h-6 w-8 text-xs text-gray-400"
            onClick={() => setIsEditing(true)}
          >
            수정
          </Button>
          <Button
            variant="ghost"
            className="h-6 w-8 text-xs text-gray-400"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  )
}

// TODO: 댓글 수정, 삭제
