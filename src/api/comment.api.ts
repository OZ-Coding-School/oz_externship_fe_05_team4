import { api } from '@/lib'
import {
  CommentCreateResponseSchema,
  CommentEditResponseSchema,
  type Comment,
  type CommentCreateForm,
  type CommentCreateResponse,
  type CommentEditForm,
} from '@/schema/'

// 댓글 등록
const postComment = async ({
  questionId,
  answerId,
  comment,
}: {
  questionId: number
  answerId: number
  comment: CommentCreateForm
}): Promise<CommentCreateResponse> => {
  const response = await api.post(
    `/qna/questions/${questionId}/answers/${answerId}/comments/`,
    comment
  )
  return CommentCreateResponseSchema.parse(response.data)
}

// 댓글 수정
const editComment = async ({
  questionId,
  answerId,
  commentId,
  comment,
}: {
  questionId: number
  answerId: number
  commentId: number
  comment: CommentEditForm
}): Promise<Comment> => {
  const response = await api.put(
    `/qna/questions/${questionId}/answers/${answerId}/comments/${commentId}/`,
    comment
  )
  return CommentEditResponseSchema.parse(response.data)
}

// 댓글 삭제
const deleteComment = async ({
  questionId,
  answerId,
  commentId,
}: {
  questionId: number
  answerId: number
  commentId: number
}): Promise<void> => {
  await api.delete(
    `/qna/questions/${questionId}/answers/${answerId}/comments/${commentId}/`
  )
}

export { postComment, editComment, deleteComment }
