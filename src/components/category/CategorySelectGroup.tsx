import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select'

interface Option {
  id: number | string
  name: string
}

interface Props {
  placeholder: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const CategorySelectGroup = ({
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: Props) => {
  const isInactive = disabled || value === ''

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={[
          'h-10 w-full rounded-md border px-3 text-sm',
          isInactive
            ? 'bg-[#ECECEC] text-[#BDBDBD]'
            : 'bg-[#FAFAFA] text-[#121212]',
        ].join(' ')}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.id} value={opt.name}>
            {opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategorySelectGroup
