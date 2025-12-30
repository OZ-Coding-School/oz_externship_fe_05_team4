import { useEffect, useMemo, useState } from 'react'
import type { Question, QuestionTab } from '@/types'

export function useQuestionFilter(
  questions: Question[],
  tab: QuestionTab,
  search: string,
  pageSize: number
) {
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const byTab =
      tab === 'answered'
        ? questions.filter((q) => q.answers > 0)
        : tab === 'waiting'
          ? questions.filter((q) => q.answers === 0)
          : questions

    if (!search.trim()) return byTab

    const keyword = search.toLowerCase()
    return byTab.filter(
      (q) =>
        q.title.toLowerCase().includes(keyword) ||
        q.preview.toLowerCase().includes(keyword)
    )
  }, [questions, tab, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  useEffect(() => {
    setPage(1)
  }, [tab, search])

  return { page, setPage, totalPages, paged }
}
