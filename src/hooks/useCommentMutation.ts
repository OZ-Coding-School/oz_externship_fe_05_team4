import { deleteComment, editComment, postComment } from '@/api/comment.api'
import { queryKeys } from '@/constants/queryKeys'
import { queryClient } from '@/lib'
import { useMutation } from '@tanstack/react-query'

// 댓글 등록
const useCreateComment = () => {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변, 댓글 따로 조회 기능까지 확장하게 되면 추가해야함
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

// 댓글 수정
const useEditComment = () => {
  return useMutation({
    mutationFn: editComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변, 댓글 따로 조회 기능까지 확장하게 되면 추가해야함
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

// 댓글 삭제
const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변, 댓글 따로 조회 기능까지 확장하게 되면 추가해야함
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

export { useCreateComment, useEditComment, useDeleteComment }
