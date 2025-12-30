import { fetchQnaQuestions } from '@/api/questions.api'
import { mapQnaQuestionToUI } from '@/utils/mapQuestion'
import { useQuery } from '@tanstack/react-query'
export function useQuestions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qna-questions'], // 옵션 없는 기본 상태
    queryFn: fetchQnaQuestions,
  })

  return {
    questions: data ? data.results.map(mapQnaQuestionToUI) : [],
    isLoading,
    isError,
    totalPages: 1, // 아직 서버 pagination 안 쓰므로 고정
  }
}
