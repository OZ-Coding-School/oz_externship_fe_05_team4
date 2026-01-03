import { ChevronDown } from 'lucide-react'

type Props = {
  font: string
  size: string
  fonts: { label: string; value: string }[]
  sizes: readonly string[]
  onFontChange: (v: string) => void
  onSizeChange: (v: string) => void
}

export default function FontControls({
  font,
  size,
  fonts,
  sizes,
  onFontChange,
  onSizeChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative shrink-0">
        <select
          className="h-8 appearance-none rounded bg-gray-100 px-3 pr-8 text-sm"
          value={font}
          onChange={(e) => onFontChange(e.target.value)}
        >
          {fonts.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
        />
      </div>

      <div className="relative shrink-0">
        <select
          className="h-8 w-20 appearance-none rounded bg-gray-100 px-3 pr-8 text-sm"
          value={size}
          onChange={(e) => onSizeChange(e.target.value)}
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
        />
      </div>
    </div>
  )
}
