import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    disabledBg?: boolean
  }
>(({ className, children, disabledBg, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-[48px] w-full items-center justify-between rounded-[4px] border px-[16px] py-[10px] text-sm focus:outline-none',
      'border-[#9D9D9D]',
      disabledBg
        ? 'cursor-not-allowed bg-[#ECECEC] text-[#BDBDBD]'
        : 'cursor-pointer bg-[#FAFAFA] text-[#121212]',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        className={cn(
          disabledBg ? 'text-[#BDBDBD]' : 'text-[#121212]',
          'h-4 w-4'
        )}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position="popper"
      side="bottom"
      align="start"
      sideOffset={4}
      className={cn('z-50 rounded-md border bg-white shadow-md', className)}
      style={{ width: 'var(--radix-select-trigger-width)' }}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm outline-none select-none',
      'hover:bg-[#EFE6FC] focus:bg-[#EFE6FC]',
      'data-[state=checked]:bg-[#FAFAFA] data-[state=checked]:text-[#6201E0]',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <Check className="h-4 w-4 text-[#6201E0]" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
}
