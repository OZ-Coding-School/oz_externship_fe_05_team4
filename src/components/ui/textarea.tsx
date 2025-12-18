import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm',
        'text-gray-primary placeholder-gray-400',
        'focus:ring-primary-400 focus:border-primary focus:ring-2 focus:outline-none',
        'disabled:bg-gray-disabled disabled:cursor-not-allowed disabled:text-gray-500',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
export default Textarea
