import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
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

interface PaginationLinkProps {
  isActive?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function PaginationLink({
  isActive,
  className,
  children,
  onClick,
}: PaginationLinkProps) {
  return (
    <Button
      type="button"
      variant={isActive ? 'outline' : 'ghost'}
      className={cn(
        'h-9 w-9 p-0',
        isActive && 'border-primary bg-primary-50 text-primary',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function PaginationPrevious({
  onClick,
  className,
}: {
  onClick?: () => void
  className?: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn('h-9 px-3', className)}
      onClick={onClick}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

function PaginationNext({
  onClick,
  className,
}: {
  onClick?: () => void
  className?: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn('h-9 px-3', className)}
      onClick={onClick}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}

function PaginationEllipsis() {
  return (
    <span className="flex h-9 w-9 items-center justify-center text-gray-400">
      <MoreHorizontal className="h-4 w-4" />
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
