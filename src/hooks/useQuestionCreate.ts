import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'
import type {
  QuestionCreateResponse,
  QuestionCreateErrorResponse,
  QuestionCreate,
} from '@/types'
import { QuestionCreateApi } from '@/api'
import { queryKeys } from '@/constants'

export const useQuestionCreate = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<
    QuestionCreateResponse,
    AxiosError<QuestionCreateErrorResponse>,
    QuestionCreate
  >({
    mutationFn: (payload) => QuestionCreateApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.all,
      })

      alert('질문이 성공적으로 등록되었습니다.')
      navigate('/')
    },
    onError: (error) => {
      alert(`등록 실패: ${error.message}`)
    },
  })
}
