import { useQuery } from '@tanstack/react-query'
import { fetchQuestions } from '@/api/questions.api'
import { useQuestionQuery } from '@/hooks/useQuestionQuery'
import { mapQuestion } from '@/utils/mapQuestion'
import type { QuestionTab, QnaListResponse } from '@/types'
import type { CategoryValue } from '@/types/category'

const PAGE_SIZE = 10

export function useQuestions(
  page: number,
  search: string,
  sort: 'latest' | 'oldest',
  tab: QuestionTab,
  category: CategoryValue
) {
  const queryString = useQuestionQuery({
    page,
    size: PAGE_SIZE,
    search,
    sort,
    tab,
    category,
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['qna-questions', queryString],
    queryFn: (): Promise<QnaListResponse> => fetchQuestions(queryString),
    placeholderData: (prev) => prev,
  })

  return {
    questions: data?.results.map(mapQuestion) ?? [],
    totalPages: data?.count ? Math.ceil(data.count / PAGE_SIZE) : 1,
    isLoading,
    isError,
    category,
  }
}
