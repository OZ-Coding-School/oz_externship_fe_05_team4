import { useState } from 'react'
import { Link } from 'react-router'
import { Pencil, Search, SlidersHorizontal } from 'lucide-react'

import SortMenu from '@/components/questions/SortingMenu'
import QuestionCard from '@/components/questions/QuestionCard'

export default function MainPage() {
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest')

  const questions = [
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
        profile: 'https://cdn.ozcodingschool.com/profiles/user_123.png',
      },
    },
    {
      id: 2,
      categories: ['프론트엔드', '프로그래밍 언어', 'Python'],
      title: 'now 함수를 써야 하는 상황 예시에 대해서',
      preview:
        '각 row마다 시간 계산 처리를 다르게 해야 하는 경우라면 now 함수를 쓰는 게 좋을 것 같습니다...',
      answers: 1,
      views: 30,
      time: '1시간 전',
      thumbnail: 'https://via.placeholder.com/200x120',
      author: {
        name: 'jnubugo',
        profile: 'https://cdn.ozcodingschool.com/profiles/user_456.png',
      },
    },
  ]

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6">
      <h1 className="text-gray-primary pt-8 text-2xl font-bold">질의응답</h1>

      <section className="mt-6 flex items-center">
        <div className="relative w-[720px]">
          <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="질문 검색"
            className="h-12 w-full rounded-full border border-gray-200 bg-gray-100 pr-5 pl-12 text-sm outline-none"
          />
        </div>

        <Link to="/Question/Create" className="ml-auto">
          <button className="bg-primary hover:bg-primary-400 flex h-[48px] items-center justify-center gap-[10px] rounded-[4px] px-[36px] text-[15px] font-semibold whitespace-nowrap text-white">
            <Pencil className="h-4 w-4" />
            질문하기
          </button>
        </Link>
      </section>

      <section className="mt-10 border-b border-gray-200">
        <div className="flex gap-10 text-sm">
          <button className="border-primary text-primary border-b-2 pb-4 font-medium">
            전체보기
          </button>
          <button className="pb-4 text-gray-500">답변완료</button>
          <button className="pb-4 text-gray-500">답변 대기중</button>
        </div>
      </section>

      <section className="mt-6 flex items-center justify-end gap-8 text-sm">
        <SortMenu sort={sort} onChange={setSort} />
        <button className="hover:text-gray-primary flex items-center gap-1 text-gray-600">
          <SlidersHorizontal className="h-4 w-4" />
          필터
        </button>
      </section>

      <section className="mt-8 space-y-6">
        {questions.map((q) => (
          <Link key={q.id} to={`/Question/Detail/${q.id}`}>
            <QuestionCard {...q} />
          </Link>
        ))}
      </section>
    </main>
  )
}
