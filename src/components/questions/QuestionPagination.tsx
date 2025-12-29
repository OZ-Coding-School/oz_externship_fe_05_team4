import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function QuestionPagination() {
  return (
    <Pagination>
      <PaginationContent className="gap-2">
        {/* 이전 */}
        <PaginationItem>
          <PaginationPrevious className="rounded-md border text-gray-400 hover:text-gray-600" />
        </PaginationItem>

        {/* 페이지 번호 */}
        <PaginationItem>
          <PaginationLink
            isActive
            className="border-primary bg-primary-50 text-primary rounded-md border"
          >
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink className="rounded-md border text-gray-500 hover:text-gray-700">
            2
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink className="rounded-md border text-gray-500 hover:text-gray-700">
            3
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext className="rounded-md border text-gray-500 hover:text-gray-700" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
