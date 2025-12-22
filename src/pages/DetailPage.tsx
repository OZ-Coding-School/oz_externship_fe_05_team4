import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button, Card, Textarea } from '@/components/ui'
import { ArrowUpDown, ChevronRight, Link, MessageCircle } from 'lucide-react'
import Card2 from '@/components/common/Card2'
import Item2 from '../components/common/Item/Item2'
import Item1 from '../components/common/Item/Item1'
import Item3 from '../components/common/Item/Item3'

export default function QuestionDetail() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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

          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 bg-black"></Avatar>

            <p className="font-medium whitespace-nowrap text-gray-700">
              김태산
            </p>
          </div>
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
        <button className="cursor-pointer text-purple-700 transition-all hover:font-bold">
          수정
        </button>
      </div>

      {/* 4. 본문 내용 영역 */}
      <div className="mt-4 border-y-1 border-gray-300 py-5 pt-10">
        <p className="text-[16px] leading-relaxed text-gray-800">
          print 명령어를 5번 안쓰고 print 한번만 쓰고 내용을 모두 넣고 표시하는
          법이 있나요?
        </p>
        <div className="mt-16 border-gray-200 pt-6">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="flex cursor-pointer items-center gap-2 rounded-full border-gray-300 px-4 py-5 text-gray-500 hover:bg-gray-50"
            >
              <Link className="h-4 w-4" />
              <span className="font-medium">공유하기</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 5. 몇개의 답변*/}
      <div className="border-gray-200 p-10"></div>
      <div className="flex items-center gap-2 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
          A
        </div>
        <p className="text-lg font-semibold text-gray-800">
          <span>2개의 답변이 있어요</span>
        </p>
      </div>

      <Card>
        <div className="p-4">
          <div className="p-4 py-3">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 shrink-0 rounded-full bg-purple-200" />
              <span className="px-3">
                young2name
                <div className="text-sm text-gray-400">
                  IT스타트업 실무형 풀스택 웹 개발 부트캠프 · 채택된 답변 수 1
                </div>
              </span>
              <Button className="text-nded-full ml-auto cursor-pointer rounded-full px-7 py-5 text-sm font-semibold text-white">
                채택하기
              </Button>
            </div>
            {/* 답변 내용 */}
            <div>
              <p className="py-4">이렇게 쓸 수 있을 것 같습니당.</p>
              <div className="my-6 rounded-lg border-gray-700 bg-gray-200 p-8">
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                  {`print("""1. 동해물과
2. 백두산이
3. 마르고 닳도록
4. 하느님이 보우하사
5. 우리 나라 만세
""")

# 결과
# 1. 동해물과
# 2. 백두산이
# 3. 마르고 닳도록
# 4. 하느님이 보우하사
# 5. 우리 나라 만세`}
                </pre>
              </div>
            </div>
            {/* {댓글 등록} */}
            <div className="text-right text-sm text-gray-400">
              11 시간 전
              <div className="">
                <div className="relative">
                  <Textarea
                    className="h-20 w-full border border-gray-300 p-3 pr-19 text-sm"
                    placeholder="  개인정보를 공유 및 요청하거나, 비방, 불법 정보 유포 등의 행위는 제재될 수 있습니다."
                  ></Textarea>
                  <Button className="absolute right-3 bottom-3 cursor-pointer rounded-full bg-gray-300 px-5 py-2 text-sm text-black">
                    등록
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-0">
              {/* 댓글 헤더 영역 */}
              <div className="flex items-center justify-between border-b border-gray-200 py-4">
                <div className="flex items-center">
                  <MessageCircle
                    className="h-6 w-6 text-black"
                    strokeWidth={2.5}
                  />

                  <h2 className="pl-1 font-semibold">댓글 1개 </h2>
                </div>
                <button className="flex items-center text-sm text-gray-600">
                  최신순
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </div>

              {/* {댓글 내용} */}
              <Item3 />
              <Item1 />
              <Item2 />
              <div className="ml-3 min-w-0 flex-1"></div>
            </div>
          </div>
        </div>
      </Card>
      <Card2></Card2>
    </div>
  )
}
