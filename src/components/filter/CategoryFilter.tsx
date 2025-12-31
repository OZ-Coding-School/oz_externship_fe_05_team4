import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { CATEGORY_DATA } from '@/data'
import { cn } from '@/lib/utils'
import type { CategoryValue } from '@/types/category'

interface Props {
  value: CategoryValue
  onChange: (v: CategoryValue) => void
}

export default function CategoryFilter({ value, onChange }: Props) {
  const mainOptions = CATEGORY_DATA

  const middleOptions = value.main
    ? (CATEGORY_DATA.find((c) => c.id === value.main?.id)?.subCategories ?? [])
    : []

  const subOptions = value.middle
    ? (middleOptions.find((c) => c.id === value.middle?.id)?.items ?? [])
    : []

  return (
    <div className="space-y-4">
      {/* 대분류 */}
      <Dropdown
        label="대분류 선택"
        value={value.main}
        options={mainOptions}
        onSelect={(v) =>
          onChange({
            main: v,
            middle: null,
            sub: null,
          })
        }
      />

      {/* 중분류 */}
      <Dropdown
        label="중분류 선택"
        value={value.middle}
        options={middleOptions}
        disabled={!value.main}
        onSelect={(v) =>
          onChange({
            ...value,
            middle: v,
            sub: null,
          })
        }
      />

      {/* 소분류 */}
      <Dropdown
        label="소분류 선택"
        value={value.sub}
        options={subOptions}
        disabled={!value.middle}
        onSelect={(v) =>
          onChange({
            ...value,
            sub: v,
          })
        }
      />
    </div>
  )
}
interface DropdownProps<T extends { id: number; name: string }> {
  label: string
  value: T | null
  options: T[]
  disabled?: boolean
  onSelect: (v: T) => void
}

function Dropdown<T extends { id: number; name: string }>({
  label,
  value,
  options,
  disabled,
  onSelect,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'rounded-md border',
        open ? 'border-primary' : 'border-gray-200',
        disabled && 'border-gray-200 bg-gray-100'
      )}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((p) => !p)
        }}
        className={cn(
          'flex h-12 w-full items-center justify-between px-4 text-sm',
          open ? 'rounded-t-md' : 'rounded-md',
          disabled
            ? 'cursor-not-allowed text-gray-400'
            : 'bg-white text-gray-900'
        )}
      >
        <span className={cn(!value && 'text-gray-400')}>
          {value?.name ?? label}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <ul className="max-h-56 overflow-auto rounded-b-md bg-white">
          {options.map((opt) => {
            const selected = value?.id === opt.id
            return (
              <li
                key={opt.id}
                onClick={() => {
                  onSelect(opt)
                  setOpen(false)
                }}
                className={cn(
                  'flex h-10 cursor-pointer items-center justify-between px-4 text-sm',
                  'hover:bg-primary-50',
                  selected && 'bg-primary-50 text-primary font-medium'
                )}
              >
                {opt.name}
                {selected && <Check className="text-primary h-4 w-4" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
