import { useEffect, useState } from 'react'
import CategoryFilter from '@/components/filter/CategoryFilter'
import type { CategoryValue } from '@/types'

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
  const [localValue, setLocalValue] = useState<CategoryValue>(value)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      <div
        className={`fixed top-[72px] right-0 z-50 flex h-[calc(100vh-96px)] w-[420px] flex-col rounded-l-xl bg-white shadow-xl transition-transform duration-300 ease-out ${mounted ? 'translate-x-0' : 'translate-x-full'} `}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold">필터</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <CategoryFilter value={localValue} onChange={setLocalValue} />
        </div>

        <div className="flex items-center justify-between border-t px-6 py-4">
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() =>
              setLocalValue({ main: null, middle: null, sub: null })
            }
          >
            선택 초기화
          </button>

          <button
            className="bg-primary hover:bg-primary-400 rounded-md px-4 py-2 text-sm font-medium text-white"
            onClick={() => {
              onApply(localValue)
              onClose()
            }}
          >
            필터 적용하기
          </button>
        </div>
      </div>
    </>
  )
}
