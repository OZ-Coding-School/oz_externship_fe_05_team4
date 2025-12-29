import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
  PageButton,
} from '@/components/ui'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function QuestionPagination({
  page,
  totalPages,
  onChange,
}: Props) {
  if (totalPages <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst disabled={page === 1} onClick={() => onChange(1)} />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrev
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1
          return (
            <PaginationItem key={p}>
              <PageButton active={p === page} onClick={() => onChange(p)}>
                {p}
              </PageButton>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            disabled={page === totalPages}
            onClick={() => onChange(page + 1)}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLast
            disabled={page === totalPages}
            onClick={() => onChange(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
