import { useEffect, useState } from 'react'
import { X, RotateCcw } from 'lucide-react'
import CategoryFilter from '@/components/filter/CategoryFilter'
import type { CategoryValue } from '@/types/category'
import { cn } from '@/lib/utils'

interface Props {
  value: CategoryValue
  onApply: (v: CategoryValue) => void
  onClose: () => void
}

export default function CategoryFilterModal({
  value,
  onApply,
  onClose,
}: Props) {
  const [localValue, setLocalValue] = useState(value)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const close = () => {
    setOpen(false)
    setTimeout(onClose, 250)
  }

  return (
    <>
      {/* Dim */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed z-50',
          'top-[56px] right-6',
          'w-[420px]',
          'max-h-[720px] min-h-[640px]',
          'rounded-xl bg-white shadow-xl',
          'flex flex-col',
          open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
          'transition-all duration-250 ease-out'
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <h2 className="text-gray-primary text-lg font-bold">필터</h2>
          <button onClick={close}>
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </header>

        {/* Content */}
        <section className="flex-1 overflow-y-auto px-6 py-6">
          <p className="mb-4 text-sm font-semibold text-gray-700">
            카테고리 선택
          </p>
          <CategoryFilter value={localValue} onChange={setLocalValue} />
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-gray-800 px-6 py-4">
          <button
            onClick={() =>
              setLocalValue({ main: null, middle: null, sub: null })
            }
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="h-4 w-4" />
            선택 초기화
          </button>

          <button
            onClick={() => {
              onApply(localValue)
              close()
            }}
            className="bg-primary hover:bg-primary-400 h-10 rounded-md px-6 text-sm font-semibold text-white"
          >
            필터 적용
          </button>
        </footer>
      </aside>
    </>
  )
}
