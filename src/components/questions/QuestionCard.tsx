import { cn } from '@/lib/utils'
import { highlightText } from '@/lib/highlight'
import defaultProfileImg from '@/assets/profile.png'
import { stripHtmlTags } from '@/utils/index'
import { IMG_BASE_URL } from '@/constants/index'

interface QuestionCardProps {
  id: number
  categories: string[]
  title: string
  preview: string
  answers: number
  views: number
  time: string
  author: {
    name: string
    profile: string | null
  }
  searchKeyword?: string
  thumbnailImgUrl: string | null
}

export default function QuestionCard({
  categories,
  title,
  preview,
  answers,
  views,
  time,
  author,
  searchKeyword = '',
  thumbnailImgUrl,
}: QuestionCardProps) {
  return (
    <article className="flex w-full cursor-pointer justify-between border-b border-gray-200 py-5 transition-colors hover:bg-gray-50">
      <div className="flex-1 pr-8">
        <div className="mb-2 flex flex-wrap items-center gap-1 text-[13px] text-gray-500">
          {categories.map((category, index) => {
            const isLast = index === categories.length - 1
            return (
              <span key={`${category}-${index}`} className="flex items-center">
                <span className={isLast ? 'underline underline-offset-2' : ''}>
                  {category}
                </span>
                {!isLast && <span className="mx-1 text-gray-400">›</span>}
              </span>
            )
          })}
        </div>

        <h2 className="mb-2 text-[16px] leading-[22px] font-semibold text-gray-900">
          {searchKeyword ? highlightText(title, searchKeyword) : title}
        </h2>

        <p className="line-clamp-2 text-[14px] leading-[20px] text-gray-600">
          {searchKeyword
            ? highlightText(stripHtmlTags(preview), searchKeyword)
            : stripHtmlTags(preview)}
        </p>

        <div className="mt-3 flex items-center gap-4 text-[12px] text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white transition-colors',
                  answers > 0
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-300'
                )}
              >
                A
              </span>
              <span>답변 {answers}</span>
            </div>
          </div>

          <span>조회수 {views}</span>

          <div className="ml-auto flex items-center gap-2">
            <img
              src={author.profile || defaultProfileImg}
              alt={author.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{author.name}</span>
            <span className="text-gray-400">{time}</span>
          </div>
        </div>
      </div>

      {thumbnailImgUrl && (
        <div className="h-[88px] w-[132px] flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
          <img
            src={`${IMG_BASE_URL}${thumbnailImgUrl}`}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </article>
  )
}
