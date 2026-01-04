import { adoptAnswer, deleteAnswer, editAnswer, postAnswer } from '@/api/index'
import { queryKeys } from '@/constants/queryKeys'
import { queryClient } from '@/lib'
import { useMutation } from '@tanstack/react-query'

// 답변 등록
const useCreateAnswer = () => {
  return useMutation({
    mutationFn: postAnswer,
    onSuccess: (_, variables) => {
      // 질문 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.list(),
      })
      // 질문 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변 목록 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.answers(variables.questionId),
      // })
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
      // 질문 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변 목록 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.answers(variables.questionId),
      // })
      // 답변 상세 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.answer(variables.questionId, variables.answerId),
      // })
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
      // 질문 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변 목록 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.answers(variables.questionId),
      // })
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

// 답변 채택
const useAdoptAnswer = () => {
  return useMutation({
    mutationFn: adoptAnswer,
    onSuccess: (_, variables) => {
      // 질문 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(variables.questionId),
      })
      // 답변 목록 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.answers(variables.questionId),
      // })
      // 답변 상세 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.answer(variables.questionId, variables.answerId),
      // })
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error(error)
    },
  })
}

export { useCreateAnswer, useEditAnswer, useDeleteAnswer, useAdoptAnswer }

// 현재 답변과 댓글의 목록이나 상세조회를 하지 않으므로, 일단 주석처리
// 나중에 사용하게 될 경우에 주석 해제하여 사용
