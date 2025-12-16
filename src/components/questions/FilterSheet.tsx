import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { X, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { CATEGORY, MainCategory, MidCategory } from '@/constants/category'

interface FilterValues {
  main?: MainCategory
  mid?: MidCategory<MainCategory>
  sub?: string
}

interface Props {
  onApply?: (v: FilterValues) => void
}

export default function FilterDialog({ onApply }: Props) {
  const [main, setMain] = useState<MainCategory>()
  const [mid, setMid] = useState<MidCategory<MainCategory>>()
  const [sub, setSub] = useState<string>()

  const reset = () => {
    setMain(undefined)
    setMid(undefined)
    setSub(undefined)
  }

  const apply = () => {
    onApply?.({ main, mid, sub })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <SlidersHorizontal className="h-4 w-4" /> 필터
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] rounded-2xl px-8 py-6">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">필터</DialogTitle>
          <DialogClose asChild>
            <button className="rounded-md p-1 hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* 대분류 */}
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-semibold">카테고리 선택</span>

            {/* 대분류 */}
            <Select
              value={main}
              onValueChange={(v: MainCategory) => {
                setMain(v)
                setMid(undefined)
                setSub(undefined)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="대분류" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY).map(([key, item]) => (
                  <SelectItem key={key} value={key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 중분류 */}
            <Select
              disabled={!main}
              value={mid}
              onValueChange={(v) => {
                setMid(v as MidCategory<MainCategory>)
                setSub(undefined)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="중분류" />
              </SelectTrigger>
              <SelectContent>
                {main &&
                  Object.entries(CATEGORY[main].mid).map(([key, item]) => (
                    <SelectItem key={key} value={key}>
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* 소분류 */}
            <Select
              disabled={!mid}
              value={sub}
              onValueChange={(v) => setSub(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="소분류" />
              </SelectTrigger>
              <SelectContent>
                {main &&
                  mid &&
                  CATEGORY[main].mid[mid].sub.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-10 flex items-center justify-between border-t pt-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            <RotateCcw className="h-4 w-4" /> 선택 초기화
          </button>

          <DialogClose asChild>
            <Button
              onClick={apply}
              className="h-11 bg-[var(--color-primary)] px-6 text-white hover:bg-[var(--color-primary-400)]"
            >
              필터 적용하기
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
