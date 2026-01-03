import { deleteAnswer, editAnswer, postAnswer } from '@/api/index'
import { queryKeys } from '@/data/queryKeys'
import { queryClient } from '@/lib'
import { useMutation } from '@tanstack/react-query'

// 답변 등록
const useCreateAnswer = () => {
  return useMutation({
    mutationFn: postAnswer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.answers(variables.questionId),
      })
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

// 답변 수정
const useEditAnswer = () => {
  return useMutation({
    mutationFn: editAnswer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.answers(variables.questionId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.answer(variables.questionId, variables.answerId),
      })
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

// 답변 삭제
const useDeleteAnswer = () => {
  return useMutation({
    mutationFn: deleteAnswer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.answers(variables.questionId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.answer(variables.questionId, variables.answerId),
      })
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

export { useCreateAnswer, useEditAnswer, useDeleteAnswer }
