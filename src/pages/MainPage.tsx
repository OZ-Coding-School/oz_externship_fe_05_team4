import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Pencil, Search, SlidersHorizontal } from 'lucide-react'

import QuestionStatusTabs, {
  type QuestionTabValue,
} from '@/components/questions/QuestionStatusTabs'
import SortMenu from '@/components/questions/SortingMenu'
import QuestionCard from '@/components/questions/QuestionCard'
import CategoryFilterModal from '@/components/filter/CategoryFilterModal'
import ChatbotFloatingButton from '@/components/chatbot/ChatbotFloatingButton'
import QuestionPagination from '@/components/questions/QuestionPagination'

import profileImg from '@/assets/profile.png'
import thumnailImg from '@/assets/Rectangle.png'
import type { CategoryValue } from '@/components/filter'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 5

export default function MainPage() {
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest')
  const [tab, setTab] = useState<QuestionTabValue>('all')
  const [page, setPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [category, setCategory] = useState<CategoryValue>({
    main: null,
    middle: null,
    sub: null,
  })

  // 더미 질문 데이터 (고정)
  const questions = useMemo(
    () => [
      {
        id: 1,
        categories: ['프론트엔드', '프로그래밍 언어', 'Python'],
        title: '오류가 발생했다고 뜨네요.',
        preview:
          '실행 결과오류가 발생했어요. AI 코드리뷰로 왜 오류가 발생했는지 확인해 보세요...',
        answers: 2,
        views: 60,
        time: '1시간 전',
        thumbnail: null,
        author: {
          name: '김태산',
          profile: profileImg,
        },
      },
      {
        id: 2,
        categories: ['프론트엔드', '프로그래밍 언어', 'Python'],
        title: 'now 함수를 써야 하는 상황 예시에 대해서',
        preview:
          '각 row마다 시간 계산 처리를 다르게 해야 하는 경우라면 now 함수를 쓰는 게 좋을 것 같습니다...',
        answers: 0,
        views: 30,
        time: '1시간 전',
        thumbnail: thumnailImg,
        author: {
          name: 'jnubugo',
          profile: profileImg,
        },
      },
    ],
    []
  )
  //필터링된 질문 목록
  const filteredQuestions = useMemo(() => {
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
  }, [tab, questions, search])

  //총 페이지 수
  const totalPages = Math.max(
    1,
    Math.ceil(filteredQuestions.length / PAGE_SIZE)
  )

  const pagedQuestions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredQuestions.slice(start, start + PAGE_SIZE)
  }, [filteredQuestions, page])

  //탭 바뀌면 페이지 1로 초기화
  useEffect(() => {
    setPage(1)
  }, [tab])
  //검색어 바뀌면 페이지 1로 초기화
  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6">
      <h1 className="text-gray-primary pt-8 text-2xl font-bold">질의응답</h1>

      <section className="mt-6 flex items-center">
        <div
          className={cn(
            'relative flex h-[56px] w-[720px] items-center rounded-full border-2 bg-white transition',
            isFocused ? 'border-primary' : 'border-gray-200'
          )}
        >
          <Search className="ml-6 h-5 w-5 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="질문 검색"
            className="flex-1 bg-transparent px-4 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
          />

          {isFocused && search && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSearch('')}
              className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
              aria-label="clear search"
            >
              ✕
            </button>
          )}
        </div>

        <Link to="/Question/Create" className="ml-auto">
          <button className="bg-primary hover:bg-primary-400 flex h-[48px] items-center gap-[10px] rounded-[4px] px-[36px] text-[15px] font-semibold text-white">
            <Pencil className="h-4 w-4" />
            질문하기
          </button>
        </Link>
      </section>

      <section className="mt-10 border-b border-gray-200">
        <QuestionStatusTabs value={tab} onChange={setTab} />
      </section>

      <section className="relative mt-6 flex items-center justify-end gap-8 text-sm">
        <SortMenu sort={sort} onChange={setSort} />

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
        >
          <SlidersHorizontal className="h-4 w-4" />
          필터
        </button>

        {isFilterOpen && (
          <CategoryFilterModal
            value={category}
            onApply={setCategory}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
      </section>

      <section className="mt-8 space-y-6">
        {pagedQuestions.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-sm text-gray-400">
            해당 조건에 맞는 질문이 없습니다.
          </div>
        ) : (
          pagedQuestions.map((q) => (
            <Link key={q.id} to={`/Question/Detail/${q.id}`}>
              <QuestionCard {...q} searchKeyword={search} />
            </Link>
          ))
        )}
      </section>

      <section className="mt-10 flex justify-center">
        <QuestionPagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </section>

      <ChatbotFloatingButton />
    </main>
  )
}
