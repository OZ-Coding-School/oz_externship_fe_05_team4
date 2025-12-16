interface QuestionCardProps {
  id: number
  categories: string[]
  title: string
  preview: string
  answers: number
  views: number
  time: string
  thumbnail?: string | null
  author: {
    name: string
    profile: string
  }
}

export default function QuestionCard({
  categories,
  title,
  preview,
  answers,
  views,
  time,
  thumbnail,
  author,
}: QuestionCardProps) {
  return (
    <article className="flex w-full cursor-pointer justify-between border-b border-gray-200 py-5">
      <div className="flex-1 pr-8">
        <div className="mb-2 flex flex-wrap items-center gap-1 text-[13px] text-gray-500">
          {categories.map((category, index) => {
            const isLast = index === categories.length - 1
            return (
              <span key={`${category}-${index}`} className="flex items-center">
                <span
                  className={
                    isLast ? 'text-primary underline underline-offset-2' : ''
                  }
                >
                  {category}
                </span>
                {!isLast && <span className="mx-1 text-gray-400">›</span>}
              </span>
            )
          })}
        </div>

        <h2 className="mb-2 text-[16px] leading-[22px] font-semibold text-gray-900">
          {title}
        </h2>

        <p className="line-clamp-2 text-[14px] leading-[20px] text-gray-600">
          {preview}
        </p>

        <div className="mt-3 flex items-center gap-4 text-[12px] text-gray-500">
          <div className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-success)] text-[10px] font-bold text-white">
              A
            </span>
            <span>답변 {answers}</span>
          </div>

          <span>조회수 {views}</span>

          <div className="ml-auto flex items-center gap-2">
            <img
              src={author.profile}
              alt={`${author.name} 프로필`}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{author.name}</span>
            <span className="text-gray-400">{time}</span>
          </div>
        </div>
      </div>

      {thumbnail && (
        <div className="h-[88px] w-[132px] flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
          <img src={thumbnail} className="h-full w-full object-cover" />
        </div>
      )}
    </article>
  )
}
