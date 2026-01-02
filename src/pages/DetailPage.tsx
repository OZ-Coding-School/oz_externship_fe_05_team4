import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button, Card } from '@/components/ui'
import { ChevronRight, Link } from 'lucide-react'
import Answer from '@/components/answer/Answer'
import { useAuthStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { AvatarFallback } from '@radix-ui/react-avatar'

interface AnswerType {
  answer_id: number
  content: string
  created_at: string
  is_adopted: boolean
  author: {
    nickname: string
    profile_img_url: string
  }
  // 필요한 다른 필드들도 추가하세요
}

// 2. 전체 질문 데이터 구조 정의
interface QuestionDetailType {
  id: number
  title: string
  content: string
  category: {
    id: number
    depth: number
    names: string[] // 문자열 배열로 변경
  }
  view_count: number
  created_at: string
  author: {
    id: number
    nickname: string
    profile_image_url: string
  }
  images: string[]
}

export default function QuestionDetail() {
  const { id } = useParams()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  // 1. 데이터를 가져오는 로직 (순수하게 fetch만 수행)
  const {
    data: detailData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['question', id],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(
        `https://api.ozcodingschool.site/api/v1/qna/questions/${id}`
      )
      const data = await response.json()
      console.log(data)

      if (!response.ok) throw new Error('데이터 로드 실패')
      return data
    },
  })

  // 2. 로딩 및 에러 처리 (데이터가 없을 때 아래 코드가 실행되지 않게 가드)
  if (isLoading) return <div>로딩 중...</div>
  if (isError || !detailData) return <div>에러가 발생했습니다.</div>

  // 3. 데이터가 확실히 존재할 때 변수 가공 (useQuery 밖에서 선언!)
  // 이제 detailData를 마음껏 쓸 수 있습니다.
  // const questionId = detailData.question_id
  // TODO:카테고리 3개이상 나오면
  const arr = detailData.category.names
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* 1. 상단 브레드크럼  */}
      <nav className="mb-4 flex items-center gap-1 text-sm font-bold text-purple-700">
        <span>{arr[0]}</span>
        <ChevronRight className="h-4 w-4" />
        <span>{arr[1]}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-purple-900">{arr[2]}</span>
      </nav>

      {/* 2. 질문 제목  */}
      <div className="flex items-start justify-between gap-4">
        <span className="text-[40px] leading-none font-bold text-purple-700">
          Q.
        </span>
        <h1 className="grow text-[29px] leading-tight font-bold text-gray-900">
          {detailData.title}
        </h1>

        <div className="flex items-center gap-2">
          {/* TODO: 아바타 배경 제거 */}
          <Avatar className="h-10 w-10 shrink-0 rounded-full">
            <AvatarImage src={detailData.author.profile_image_url} />
            <AvatarFallback className="bg-gray-200 text-gray-500">
              {detailData.author.nickname}
            </AvatarFallback>
          </Avatar>

          <p className="font-medium whitespace-nowrap text-gray-700">
            {detailData.author.nickname}
          </p>
        </div>
      </div>

      {/* 3. 조회수 및 수정 버튼 영역 */}
      <div className="mt-6 flex items-center justify-between text-sm">
        {/* TODO: 조회수 및 시간 */}
        <p className="text-gray-400">
          조회수 {detailData.view_count}
          {detailData.created_at}
        </p>
        {isAuthenticated && user?.nickname === detailData.author.nickname && (
          <Button
            variant="ghost"
            className="cursor-pointer text-purple-700"
            onClick={() => navigate(`/Question/edit/${detailData.id}`)}
          >
            수정
          </Button>
        )}
      </div>

      {/* 4. 본문 내용 영역 */}
      <div className="mt-4 border-y-1 border-gray-300 py-5 pt-10">
        <p className="text-[16px] leading-relaxed text-gray-800">
          {detailData.content}
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

      {/* 5. 답변자 ui */}
      {isAuthenticated && (
        <Card className="my-20 flex items-center justify-between rounded-3xl border-gray-200 p-9">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-purple-100">
              <AvatarImage src={detailData.author.profile_img_url} />
            </Avatar>

            {/* 텍스트 부분 */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-purple-600">
                {detailData.author.nickname} 님,
              </span>
              <span className="text-lg font-bold text-gray-900">
                정보를 공유해 주세요.
              </span>
            </div>
          </div>

          {/* 버튼 부분 */}

          <Button className="rounded-full bg-purple-600 px-8 py-6 text-lg font-medium text-white hover:bg-purple-700">
            답변하기
          </Button>
        </Card>
      )}
      {/* 5. 몇개의 답변*/}
      <div className="flex items-center gap-2 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
          A
        </div>
        <p className="text-lg font-semibold text-gray-800">
          <span>{detailData.answers.length}개의 답변이 있어요</span>
        </p>
      </div>
      {/* TODO: any type 수정 */}
      {detailData.answers.map((answer: any) => (
        // TODO: 예비 1번
        <Answer key={answer.answer_id} answer={answer} user={user} />
      ))}
    </div>
  )
}
