import { useQuery } from '@tanstack/react-query'
import { fetchQuestionDetail } from '@/api/questions.api'
import { queryKeys } from '@/constants/queryKeys'

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: queryKeys.detail(Number(id)),
    enabled: !!id,
    queryFn: () => fetchQuestionDetail(id),
  })
}
