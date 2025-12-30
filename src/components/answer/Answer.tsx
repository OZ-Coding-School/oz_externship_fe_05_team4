import { Avatar } from '@radix-ui/react-avatar'
import { Button, Card, Textarea } from '../ui'
import { ArrowUpDown, MessageCircle } from 'lucide-react'
import Comment from '@/components/common/Comment'

interface AnswerProps {
  answer_id: number
  content: string
  created_at: string
  is_adopted: boolean
  author: {
    nickname: string
    profile_img_url: string
  }
  comments: {
    comment_id: number
    content: string
    created_at: string
    author: {
      nickname: string
      profile_img_url: string
    }
  }[]
}

export default function Answer({
  answer,
  user,
}: {
  answer: AnswerProps
  user: any
}) {
  const isLoggedIn = !!user

  return (
    <Card className="mb-20">
      <div className="p-4">
        <div className="py-2">
          <div className="p-4 py-3">
            <div className="flex items-center">
              <Avatar className="h- 10 w-10 shrink-0 rounded-full bg-purple-200" />
              <span className="px-3">
                {answer.author.nickname}
                {/* TODO: 이거에 해당하는 데이터가 없음 */}
                <div className="text-sm text-gray-400">
                  IT스타트업 실무형 풀스택 웹 개발 부트캠프 · 채택된 답변 수 1
                </div>
              </span>
              {/* 로그인한 사람에게만 '채택하기' 버튼 노출 */}
              {isLoggedIn && (
                <Button className="ml-auto rounded-full bg-purple-600 px-5 text-white">
                  채택하기
                </Button>
              )}
            </div>
          </div>
          {/* 답변 내용 */}
          <div className="py-10 whitespace-pre-wrap">{answer.content}</div>
          {/* {댓글 등록} */}
          <div className="text-right text-sm text-gray-400">
            {/* TODO 아직 시간데이터 x */}
            11 시간 전
            {isLoggedIn && (
              <div>
                <div className="relative">
                  <Textarea
                    className="h-20 w-full border border-gray-300 p-3 pr-19 text-sm"
                    placeholder="  개인정보를 공유 및 요청하거나, 비방, 불법 정보 유포 등의 행위는 제재될 수 있습니다."
                  ></Textarea>
                  <Button className="absolute right-3 bottom-3 cursor-pointer rounded-full bg-gray-200 px-5 py-2 text-sm text-black">
                    등록
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="p-0">
            {/* 댓글 헤더 영역 */}
            <div className="flex items-center justify-between border-b border-gray-200 py-4">
              <div className="flex items-center">
                <MessageCircle
                  className="h-6 w-6 text-black"
                  strokeWidth={2.5}
                />

                <h2 className="pl-1 font-semibold">
                  댓글 {answer.comments.length}개{' '}
                </h2>
              </div>
              <Button variant="ghost" className="cursor-pointer text-gray-600">
                최신순
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* {댓글 내용} */}

            {answer.comments.map((comment) => {
              return (
                <Comment
                  key={comment.comment_id}
                  nickname={comment.author.nickname}
                  date={comment.created_at}
                  content={comment.content}
                />
              )
            })}

            <div className="ml-3 min-w-0 flex-1"></div>
          </div>
        </div>
      </div>
    </Card>
  )
}
