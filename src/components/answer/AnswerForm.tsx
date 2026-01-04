import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Button, Card } from '@/components/ui/index'
import type { Author } from '@/schema/index'
import { useState } from 'react'
import profile from '@/assets/profile.png'
import AnswerEditor from './AnswerEditor'

const AnswerForm = ({ questionAuthor }: { questionAuthor: Author }) => {
  const [isAnswering, setIsAnswering] = useState<boolean>(false)

  return (
    <Card className="flex flex-col overflow-hidden rounded-3xl border-gray-200">
      <div className="flex items-center gap-4 p-10">
        <Avatar className="h-12 w-12 overflow-hidden rounded-full">
          <AvatarImage src={questionAuthor.profileImageUrl ?? profile} />
        </Avatar>

        <div className="flex grow flex-col">
          <span className="text-primary text-sm font-medium">
            {questionAuthor.nickname} 님,
          </span>
          <span className="font-semibold text-gray-800">
            정보를 공유해 주세요.
          </span>
        </div>

        <Button
          className="bg-primary rounded-full px-8 py-6 text-lg font-medium text-white hover:bg-violet-900"
          onClick={() => setIsAnswering(!isAnswering)}
        >
          {!isAnswering ? '답변하기' : '등록하기'}
        </Button>
      </div>

      {isAnswering && <AnswerEditor />}
    </Card>
  )
}

export default AnswerForm
