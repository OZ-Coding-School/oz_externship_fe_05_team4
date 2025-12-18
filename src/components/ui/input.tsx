import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm',
        'text-gray-primary placeholder-gray-400',
        'focus:border-primary focus:ring-primary-400 focus:ring-2 focus:outline-none',
        'disabled:bg-gray-disabled disabled:cursor-not-allowed disabled:text-gray-500',
        className
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export default Input
