import { Link } from 'react-router'
import { Pencil, SlidersHorizontal } from 'lucide-react'

import SearchBar from '@/components/questions/SearchBar'
import SortMenu from '@/components/questions/SortingMenu'
import QuestionStatusTabs, {
  type QuestionTabValue,
} from '@/components/questions/QuestionStatusTabs'
import QuestionCard from '@/components/questions/QuestionCard'
import QuestionPagination from '@/components/questions/QuestionPagination'
import CategoryFilterModal from '@/components/filter/CategoryFilterModal'
import ChatbotFloatingButton from '@/components/chatbot/ChatbotFloatingButton'

import { useQuestions } from '@/hooks/useQuestions'
import { useSessionState } from '@/hooks/useSessionState'
import { useEffect } from 'react'
import type { CategoryValue } from '@/types'

export default function MainPage() {
  const [tab, setTab] = useSessionState<QuestionTabValue>('qna-tab', 'all')
  const [search, setSearch] = useSessionState('qna-search', '')
  const [sort, setSort] = useSessionState<'latest' | 'oldest'>(
    'qna-sort',
    'latest'
  )
  const [page, setPage] = useSessionState<number>('qna-page', 1)

  const [isFilterOpen, setIsFilterOpen] = useSessionState(
    'qna-filter-open',
    false
  )

  const [category, setCategory] = useSessionState<CategoryValue>(
    'qna-category',
    {
      main: null,
      middle: null,
      sub: null,
    }
  )

  useEffect(() => {
    setPage(1)
  }, [category, tab, search, sort, setPage])

  /*데이터*/
  const { questions, totalPages, isLoading, isError } = useQuestions(
    page,
    search,
    sort,
    tab,
    category
  )

  /*렌더*/
  return (
    <main className="mx-auto w-full max-w-[960px] px-6">
      <h1 className="pt-8 text-2xl font-bold text-gray-900">질의응답</h1>

      {/* 검색 + 질문하기 */}
      <section className="mt-6 flex items-center justify-between gap-6">
        <div className="max-w-[640px] flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <Link to="/Question/Create">
          <button className="bg-primary hover:bg-primary-400 flex h-10 items-center gap-2 rounded-md px-6 text-sm font-semibold text-white">
            <Pencil className="h-4 w-4" />
            질문하기
          </button>
        </Link>
      </section>

      {/* 탭 + 정렬/필터 */}
      <section className="mt-10 flex items-end justify-between border-b border-gray-200">
        <QuestionStatusTabs value={tab} onChange={setTab} />

        {/* Sort + Filter */}
        <div className="mb-2 flex items-center gap-6 text-sm text-gray-700">
          <SortMenu sort={sort} onChange={setSort} />

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1 hover:text-gray-900"
          >
            <SlidersHorizontal className="h-4 w-4" />
            필터
          </button>
        </div>
      </section>

      {/*질문 리스트*/}
      <section className="mt-8 space-y-6">
        {isLoading && (
          <div className="py-20 text-center text-sm text-gray-400">
            질문 목록을 불러오는 중입니다…
          </div>
        )}

        {isError && (
          <div className="py-20 text-center text-sm text-red-500">
            질문 목록을 불러오지 못했습니다.
          </div>
        )}

        {!isLoading && !isError && questions.length === 0 && (
          <div className="py-20 text-center text-sm text-gray-400">
            해당 조건에 맞는 질문이 없습니다.
          </div>
        )}

        {!isLoading &&
          !isError &&
          questions.map((q) => (
            <Link key={q.id} to={`/Question/Detail/${q.id}`}>
              <QuestionCard {...q} searchKeyword={search} />
            </Link>
          ))}
      </section>

      {/*페이지네이션*/}
      <section className="mt-10 flex justify-center">
        <QuestionPagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </section>
      <ChatbotFloatingButton />

      {isFilterOpen && (
        <CategoryFilterModal
          value={category}
          onApply={(v) => {
            setCategory(v)
            setIsFilterOpen(false)
          }}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </main>
  )
}
