import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('flex justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return <ul className={cn('flex items-center gap-2', className)} {...props} />
}

function PaginationItem(props: React.ComponentProps<'li'>) {
  return <li {...props} />
}

interface PageButtonProps {
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

function PageButton({ active, disabled, onClick, children }: PageButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md text-sm',
        'transition-colors',
        active
          ? 'bg-primary text-white'
          : 'hover:bg-primary/10 hover:text-primary text-gray-400',
        disabled && 'cursor-not-allowed opacity-40'
      )}
    >
      {children}
    </button>
  )
}

function PaginationPrev({
  disabled,
  onClick,
}: {
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <PageButton disabled={disabled} onClick={onClick}>
      <ChevronLeft />
    </PageButton>
  )
}

function PaginationNext({
  disabled,
  onClick,
}: {
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <PageButton disabled={disabled} onClick={onClick}>
      <ChevronRight />
    </PageButton>
  )
}

function PaginationFirst({
  disabled,
  onClick,
}: {
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <PageButton disabled={disabled} onClick={onClick}>
      <ChevronsLeft />
    </PageButton>
  )
}

function PaginationLast({
  disabled,
  onClick,
}: {
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <PageButton disabled={disabled} onClick={onClick}>
      <ChevronsRight />
    </PageButton>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PageButton,
}
