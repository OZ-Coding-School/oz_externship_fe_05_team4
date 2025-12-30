import { ArrowUpDown, MessageCircle } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { Button, Card, Textarea } from '../ui'

export default function Detailpage() {
  return (
    <div className="px-4 py-8">
      <Card className="my-8">
        <div className="border-gray-200 p-2"></div>

        <div className="p-2">
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
            <p className="py-9 text-sm text-gray-700">
              동해물과 백두산이 마르고 닳도록
            </p>

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
              <div className="flex items-center justify-between border-b border-gray-200 py-4">
                <div className="flex items-center">
                  <MessageCircle
                    className="h-6 w-6 text-black"
                    strokeWidth={2.5}
                  />

                  <h2 className="pl-1 font-semibold">댓글 1개 </h2>
                </div>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-gray-600"
                >
                  최신순
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-3 border-gray-50 py-4">
                <Avatar className="h-10 w-10 shrink-0 rounded-full bg-purple-200" />

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">iron</span>
                    <span className="text-sm text-gray-400">
                      2025년 6월 13일
                    </span>
                  </div>

                  <div className="mt-1.5 text-[15px] text-gray-800">
                    감사합니다!
                  </div>
                </div>
              </div>

              <div className="ml-3 min-w-0 flex-1"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
