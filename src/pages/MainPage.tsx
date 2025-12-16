import { Search } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'

import SortMenu from '@/components/questions/SortingMenu'
import FilterDialog from '@/components/questions/FilterSheet'

export default function MainPage() {
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest')

  return (
    <main className="mx-auto w-full max-w-[960px] px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-gray-primary)]">
        질의응답
      </h1>

      <section className="mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-400)]" />

          <input
            type="text"
            placeholder="질문 검색"
            className="h-10 w-full rounded-full border border-[var(--color-gray-200)] bg-[var(--color-gray-100)] px-10 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <Link to="/Question/Create">
          <button className="h-10 rounded-full bg-[var(--color-primary)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-primary-400)]">
            질문 등록하기
          </button>
        </Link>
      </section>

      <section className="mb-4 flex items-center gap-6 text-sm">
        <button className="border-b-2 border-[var(--color-primary)] pb-1 font-semibold text-[var(--color-primary)]">
          전체보기
        </button>
        <button className="pb-1 text-[var(--color-gray-500)]">답변완료</button>
        <button className="pb-1 text-[var(--color-gray-500)]">
          답변 대기중
        </button>
      </section>

      <section className="mb-4 flex items-center justify-end gap-6 text-sm">
        <SortMenu sort={sort} onChange={setSort} />
        <FilterDialog />
      </section>
    </main>
  )
}
