import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/index'
import { ChevronRight, Link } from 'lucide-react'
import { useAuthStore } from '@/store'
import { useNavigate, useParams } from 'react-router'
import { useQuestion } from '@/hooks/useQuestion'
import type { Answer as AnswerType } from '@/schema/index'
import Answer from '@/components/answer/Answer'
import profile from '@/assets/profile.png'
import { timeAgo } from '@/utils/date'
import { useState } from 'react'
import AnswerCreate from '@/components/answer/AnswerCreate'
import AnswerEdit from '@/components/answer/AnswerEdit'

export default function QuestionDetail() {
  const { id } = useParams()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const { data: question, isLoading, isError } = useQuestion(id!)

  const hasAdoptedAnswer =
    question?.answers.some((answer) => answer.isAdopted) ?? false

  const myAnswer = question?.answers.find(
    (answer) => answer.author.id === user?.id
  )

  const sortedAnswers = [
    ...(question?.answers.filter(
      (answer) => answer.isAdopted && answer.author.id !== user?.id
    ) ?? []),
    ...(question?.answers.filter(
      (answer) => !answer.isAdopted && answer.author.id !== user?.id
    ) ?? []),
  ]

  const canCreateAnswer =
    isAuthenticated && !myAnswer && user?.id !== question?.author.id

  const [isEditingAnswer, setIsEditingAnswer] = useState<boolean>(false)

  // TODO: 로딩 중, 에러 처리 (Suspense & Error Boundary?)
  if (isLoading) return <div>로딩 중...</div>

  if (isError || !question) return <div>에러가 발생했습니다.</div>

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-8">
      <div className="flex flex-col gap-4">
        {/* 1. 상단 브레드크럼  */}
        <nav className="text-primary flex items-center gap-1 font-semibold">
          <span>{question.category.names[0]}</span>
          {question.category.names.length > 1 && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>{question.category.names[1]}</span>
            </>
          )}
          {question.category.names.length > 2 && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="font-bold">{question.category.names[2]}</span>
            </>
          )}
        </nav>

        {/* 질문 제목  */}
        <div className="flex items-start justify-between gap-4">
          <span className="text-primary text-[40px] leading-none font-bold">
            Q.
          </span>
          <h1 className="grow text-3xl font-bold">{question.title}</h1>

          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 overflow-hidden rounded-full">
              <AvatarImage src={question.author.profileImageUrl ?? profile} />
            </Avatar>

            <p className="font-medium whitespace-nowrap text-gray-700">
              {question.author.nickname}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className="text-gray-400">
              조회수 {question.viewCount} • {timeAgo(question.createdAt)}
            </span>
          </div>
          {isAuthenticated && user?.id === question.author.id && (
            <Button
              variant="ghost"
              className="text-primary"
              onClick={() => navigate(`/Question/edit/${question.id}`)}
            >
              수정
            </Button>
          )}
        </div>
      </div>

      {/* 질문 내용 */}
      <div className="border-y-1 border-gray-300 py-12">
        {/* TODO: 텍스트 에디터 뷰어로 대체하기 */}
        <p
          dangerouslySetInnerHTML={{ __html: question.content }}
          className="text-[16px] leading-relaxed text-gray-800"
        />

        <div className="mt-16 border-gray-200 pt-6">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full border-gray-300 px-4 py-5 text-gray-500 hover:bg-gray-50"
            >
              <Link className="h-4 w-4" />
              <span className="font-medium">공유하기</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 답변하기 */}
      {canCreateAnswer && (
        <AnswerCreate
          questionId={question.id}
          questionAuthor={question.author}
        />
      )}

      {/* 답변 수정하기 */}
      {isEditingAnswer && (
        <AnswerEdit
          questionId={question.id}
          answerId={myAnswer!.id}
          questionAuthor={question.author}
          myAnswer={myAnswer!}
          setIsEditingAnswer={setIsEditingAnswer}
        />
      )}

      {/* 내 답변 */}
      {myAnswer && (
        <Answer
          key={id}
          answer={myAnswer}
          questionId={question.id}
          questionAuthorId={question.author.id}
          hasAdoptedAnswer={hasAdoptedAnswer}
          isEditing={isEditingAnswer}
          setIsEditing={setIsEditingAnswer}
        />
      )}

      {/* 답변 */}
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-3">
          <span className="bg-primary flex h-9 w-9 items-center justify-center rounded-full font-bold text-white">
            A
          </span>
          <p className="text-xl font-bold text-gray-800">
            <span>{question.answers.length}개의 답변이 있어요</span>
          </p>
        </div>

        {sortedAnswers.map((answer: AnswerType) => (
          <Answer
            key={answer.id}
            answer={answer}
            questionId={question.id}
            questionAuthorId={question.author.id}
            hasAdoptedAnswer={hasAdoptedAnswer}
          />
        ))}
      </div>
    </div>
  )
}
