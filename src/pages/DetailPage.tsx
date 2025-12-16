import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

export default function JaeminPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl p-4 md:p-8">
        {/* 1. 질문 Card 영역 */}

        <div className="p-4 md:p-6">
          <div className="question-section-container">
            <p className="text-purple mt-21 text-purple-600">
              <span className="font-semibold hover:text-purple-400">
                프론트엔드
              </span>
              <span className="mx-1">&gt;</span>
              <span className="font-semibold hover:text-purple-400">
                프로그래밍 언어
              </span>
              <span className="mx-1">&gt;</span>
              <span className="font-extrabold text-purple-600">Python</span>
            </p>
            <div className="q-title-area mt-4 flex items-start">
              <span className="mr-2 mb-8 text-4xl font-extrabold text-purple-700">
                Q.
              </span>
              <div>
                <p className="text-lg font-bold">제목</p>
              </div>
            </div>
          </div>
          <div className="answer-list-container">
            <div className="answer-count-header"></div>
          </div>
        </div>

        <hr className="my-2 border-gray-300" />
        <span>질문내용</span>
        <hr className="my-6 mb-8 border-gray-300" />

        {/* 2. 답변 Card 영역 */}
        <div className="answer-list-container px-4">
          <Card className="mb-6">
            <div className="flex items-center border-b border-gray-200 p-4">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-700">
                <span className="text-lg font-extrabold text-white">A</span>
              </div>
            </div>

            <div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    <span className="font-bold">답변자</span> | IT스타트업
                    실무형 풀스택 웹 개발 부트캠프 |{' '}
                    <span className="text-purple-700">채택된 답변</span>
                  </div>
                  <Button className="rounded-md bg-purple-700 px-3 py-1 text-sm font-semibold text-white">
                    채택하기
                  </Button>
                </div>

                <p className="my-4 text-sm text-gray-700">질문의 제목을 입력</p>

                <div className="rounded-lg bg-gray-200 p-4 font-mono text-sm">
                  <span>질문의 내용을 입력</span>
                </div>

                <div className="mt-4 text-right text-sm text-gray-400">
                  11 시간 전
                </div>
              </div>
            </div>
          </Card>
        </div>

        <hr className="my-2 border-gray-300" />
      </div>

      <div className="comment-input-section mx-auto mt-10 max-w-4xl border-t border-gray-200 px-4 pt-8">
        <div className="relative">
          <textarea
            className="h-20 w-full resize-none rounded-lg border border-gray-300 p-3 pr-20 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="  개인정보를 공유 및 요청하거나, 비방, 불법 정보 유포 등의 행위는 제재될 수 있습니다."
          ></textarea>
          <Button className="absolute right-3 bottom-3 rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700">
            등록
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4">
        <Card>
          <div className="p-0">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">댓글 </h2>
              </div>
              <button className="flex items-center text-sm text-gray-600 hover:text-purple-600">
                최신순
              </button>
            </div>

            <div className="comment-list-items">
              <div className="flex items-start border-b border-gray-100 p-4"></div>
            </div>
          </div>
        </Card>
        <Card className="mt-8">
          <div className="p-0">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">댓글 </h2>
              </div>
              <button className="flex items-center text-sm text-gray-600 hover:text-purple-600">
                최신순
              </button>
            </div>

            <div className="comment-list-items">
              <div className="flex items-start border-b border-gray-100 p-4"></div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
