interface QuestionCardProps {
  title: string
  preview: string
  answers: number
  views: number
  time: string
  thumbnail?: string | null
  solved?: boolean
}

export default function QuestionCard({
  title,
  preview,
  answers,
  views,
  time,
  thumbnail,
  solved,
}: QuestionCardProps) {
  return (
    <article className="flex w-full justify-between border-b border-[var(--color-gray-200)] py-4">
      <div className="flex-1 pr-4">
        <h2 className="mb-1 text-sm font-semibold text-[var(--color-gray-primary)]">
          {title}
        </h2>

        <p className="line-clamp-2 text-xs text-[var(--color-gray-500)]">
          {preview}
        </p>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-[var(--color-gray-500)]">
          {solved ? (
            <span className="flex items-center gap-1 font-medium text-[var(--color-success)]">
              ● 답변완료
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[var(--color-gray-400)]">
              ● 답변대기중
            </span>
          )}

          <span>답변 {answers}</span>
          <span>·</span>
          <span>조회 {views}</span>
          <span>·</span>
          <span>{time}</span>
        </div>
      </div>

      <div className="h-[80px] w-[120px] flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-gray-100)]">
        {thumbnail ? (
          <img
            src={thumbnail}
            className="h-full w-full object-cover"
            alt="thumbnail"
          />
        ) : null}
      </div>
    </article>
  )
}
