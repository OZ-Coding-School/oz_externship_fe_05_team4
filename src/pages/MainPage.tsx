import SearchBar from '@/components/questions/SearchBar'
import Tabs from '@/components/questions/Tabs'
import { Link } from 'react-router'

export default function MainPage() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-gray-primary)]">
        질문응답
      </h1>

      <section className="mb-6 flex items-center justify-between gap-4">
        <SearchBar />

        <Link to="/Question/Create">
          <button className="h-10 rounded-full bg-[var(--color-primary)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-primary-400)]">
            질문 등록하기
          </button>
        </Link>
      </section>

      <section className="mb-6">
        <Tabs />
      </section>
    </main>
  )
}
