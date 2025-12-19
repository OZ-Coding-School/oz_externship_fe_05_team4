import { ChevronRight, Link2 } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Card2 from '../components/common/Card2'

export default function QuestionDetail() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* 1. 상단 브레드크럼  */}
      <nav className="mb-4 flex items-center gap-1 text-sm font-bold text-purple-700">
        <span>프론트엔드</span>
        <ChevronRight className="h-4 w-4" />
        <span>프로그래밍 언어</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-purple-900">Python</span>
      </nav>

      {/* 2. 질문 헤더 영역  */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="text-[40px] leading-none font-bold text-purple-700">
            Q.
          </span>
          <h1 className="text-[29px] leading-tight font-bold text-gray-900">
            print 를 5번 쓰지 않고, print 를 1번만 쓰고 5줄을 모두 표시하는 법이
            있나요?
          </h1>
        </div>

        {/* 사용자 아바타 및 이름 */}
        <div className="flex shrink-0 items-center gap-2">
          <Avatar className="h-10 w-10 border border-gray-100">
            <AvatarImage src="/path-to-your-image.jpg" />
          </Avatar>
        </div>
      </div>

      {/* 3. 조회수 및 수정 버튼 영역 */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <p className="text-gray-400">조회수 60 · 15시간 전</p>
        <button className="text-purple-700 transition-all hover:font-bold">
          수정
        </button>
      </div>

      {/* 4. 본문 내용 영역 */}
      <div className="mt-4 border-t border-gray-200 pt-10">
        <p className="text-[16px] leading-relaxed text-gray-800">
          print 명령어를 5번 안쓰고 print 한번만 쓰고 내용을 모두 넣고 표시하는
          법이 있나요?
        </p>
      </div>

      {/* 5. 하단 공유하기 버튼 영역*/}
      <div className="mt-16 border-t border-gray-200 pt-6">
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full border-gray-300 px-6 py-5 text-gray-500 hover:bg-gray-50"
          >
            <Link2 className="h-4 w-4" />
            <span className="font-medium">공유하기</span>
          </Button>
          <Card2></Card2>
        </div>
      </div>
    </div>
  )
}
