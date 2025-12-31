import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type {
  QuestionCreateResponse,
  QuestionCreateErrorResponse,
  QuestionCreate,
} from '@/types'
import { QuestionCreateApi } from '@/api/QuestionCreateApi'

export const useQuestionCreate = () =>
  useMutation<
    QuestionCreateResponse,
    AxiosError<QuestionCreateErrorResponse>,
    QuestionCreate
  >({
    mutationFn: (payload) => QuestionCreateApi(payload),
  })
