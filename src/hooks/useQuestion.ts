import { useQuery } from '@tanstack/react-query'
import { fetchQuestionDetail } from '@/api/questions.api'

export const useQuestion = (id: string | undefined) => {
  return useQuery({
    queryKey: ['question', id],
    enabled: !!id,
    queryFn: () => fetchQuestionDetail(id!),
  })
}
