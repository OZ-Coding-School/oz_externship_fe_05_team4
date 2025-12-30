import { Avatar } from '@radix-ui/react-avatar'

interface CommentProps {
  nickname: string
  date: string
  content: string
}
export default function Comment({ nickname, date, content }: CommentProps) {
  return (
    <div className="flex space-x-3 border-gray-50 py-4">
      <Avatar className="h-10 w-10 shrink-0 rounded-full bg-purple-200" />

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{nickname}</span>
          <span className="text-sm text-gray-400">{date}</span>
        </div>

        <div className="mt-1.5 text-[15px] text-gray-800">{content}</div>
      </div>
    </div>
  )
}
