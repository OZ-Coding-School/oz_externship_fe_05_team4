import type { QuestionTab, AnswerStatus } from '@/types'
import type { CategoryValue } from '@/types/category'

interface Params {
  page: number
  size: number
  search: string
  sort: 'latest' | 'oldest'
  tab: QuestionTab
  category: CategoryValue
}

const ANSWER_STATUS_MAP: Record<QuestionTab, AnswerStatus | undefined> = {
  all: undefined,
  answered: 'answered',
  waiting: 'unanswered',
}

export function useQuestionQuery({
  page,
  size,
  search,
  sort,
  tab,
  category,
}: Params) {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('size', String(size))
  params.set('sort', sort)

  if (search.trim()) {
    params.set('search_keyword', search.trim())
  }

  const answerStatus = ANSWER_STATUS_MAP[tab]
  if (answerStatus) {
    params.set('answer_status', answerStatus)
  }

  if (category?.sub?.id) {
    params.set('category_id', String(category.sub.id))
  }

  return params.toString()
}
