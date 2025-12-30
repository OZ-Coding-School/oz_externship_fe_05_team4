import { useEffect, useMemo, useState } from 'react'
import type { Question, QuestionTab } from '@/types'
import { fetchQuestions } from '@/api/questions.api'

const PAGE_SIZE = 7

export function useQuestions(tab: QuestionTab, search: string) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchQuestions().then(setQuestions)
  }, [])

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  useEffect(() => {
    setPage(1)
  }, [tab, search])

  return {
    page,
    setPage,
    totalPages,
    questions: paged,
  }
}
