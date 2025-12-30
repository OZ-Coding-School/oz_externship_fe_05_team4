import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button, Card } from '@/components/ui'
import { ChevronRight, Link } from 'lucide-react'
import Answer from '@/components/answer/Answer'
import { useState } from 'react'

const detailData = {
  question_id: 10501,
  title: 'Django ORM 역참조는 어떻게 사용하나요?',
  content: 'ForeignKey에 related_name을 지정하면 역참조가 가능합니다...',
  images: [
    'https://cdn.ozcodingschool.com/qna/img_10501_01.png',
    'https://cdn.ozcodingschool.com/qna/img_10501_02.png',
  ],
  category_path: '백엔드 > Django > ORM',
  view_count: 88,
  created_at: '2025-03-01 10:03:21',
  author: {
    nickname: '한율회장',
    profile_img_url: 'https://cdn.ozcodingschool.com/profiles/user_123.png',
  },
  answers: [
    {
      answer_id: 8801,
      content: 'Post 객체 기준에서 post.answer_set.all() 로 접근 가능합니다.',
      created_at: '2025-03-01 12:10:11',
      is_adopted: false,
      author: {
        nickname: 'PythonKing',
        profile_img_url: 'https://cdn.ozcodingschool.com/profiles/user_222.png',
      },
      comments: [
        {
          comment_id: 91001,
          content: '관련 예제 코드도 공유해주실 수 있나요?',
          created_at: '2025-03-01 13:20:44',
          author: {
            nickname: 'DBMaster',
            profile_img_url:
              'https://cdn.ozcodingschool.com/profiles/user_111.png',
          },
        },
        {
          comment_id: 91002,
          content: '아니요',
          created_at: '2025-03-01 13:20:44',
          author: {
            nickname: 'iron',
            profile_img_url:
              'https://cdn.ozcodingschool.com/profiles/user_111.png',
          },
        },
        {
          comment_id: 91003,
          content: '댓글 목업 데이터',
          created_at: '2025-03-01 13:20:44',
          author: {
            nickname: 'jnubugo',
            profile_img_url:
              'https://cdn.ozcodingschool.com/profiles/user_111.png',
          },
        },
      ],
    },
    {
      answer_id: 8802,
      content: `print("""1. 동해물과
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
# 5. 우리 나라 만세`,
      created_at: '2025-12-01 12:10:11',
      is_adopted: false,
      author: {
        nickname: 'young2name',
        profile_img_url: 'https://cdn.ozcodingschool.com/profiles/user_222.png',
      },
      comments: [
        {
          comment_id: 91011,
          content: '좋은 답변 감사합니다!',
          created_at: '2025-03-01 13:20:44',
          author: {
            nickname: 'OZ',
            profile_img_url:
              'https://cdn.ozcodingschool.com/profiles/user_111.png',
          },
        },
        {
          comment_id: 91012,
          content: '좋아요!',
          created_at: '2025-03-01 13:20:44',
          author: {
            nickname: 'JM',
            profile_img_url:
              'https://cdn.ozcodingschool.com/profiles/user_111.png',
          },
        },
      ],
    },
  ],
}

export default function QuestionDetail() {
  const [user, setUser] = useState(null)
  const arr = detailData.category_path.split(' > ')
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
          <Avatar className="h-10 w-10 bg-black">
            <AvatarImage src={detailData.author.profile_img_url} />
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
        <Button variant="ghost" className="cursor-pointer text-purple-700">
          수정
        </Button>
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

      {/* 5. 몇개의 답변*/}
      <div className="flex items-center gap-2 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
          A
        </div>
        <p className="text-lg font-semibold text-gray-800">
          <span>{detailData.answers.length}개의 답변이 있어요</span>
        </p>
      </div>

      {detailData.answers.map((answer) => (
        // TODO: 예비 1번
        <Answer key={answer.answer_id} answer={answer} user={user} />
      ))}
    </div>
  )
}
