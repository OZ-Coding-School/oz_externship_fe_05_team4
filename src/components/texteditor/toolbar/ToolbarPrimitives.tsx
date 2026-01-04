export const IconBtn = ({
  onClick,
  active,
  children,
}: {
  onClick?: () => void
  active?: boolean
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'flex h-8 w-8 shrink-0 items-center justify-center rounded',
      'hover:bg-gray-100',
      active ? 'bg-gray-100' : '',
      '[&>svg]:block',
    ].join(' ')}
  >
    {children}
  </button>
)

export const Divider = () => (
  <div className="mx-1 h-5 w-px shrink-0 bg-[#CECECE]" />
)

export const Group = ({
  children,
  withDivider = true,
}: {
  children: React.ReactNode
  withDivider?: boolean
}) => (
  <>
    <div className="flex shrink-0 items-center gap-1">{children}</div>
    {withDivider && <Divider />}
  </>
)

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="px-1 pt-1 text-xs font-semibold text-gray-500">
    {children}
  </div>
)

export const Hr = () => <div className="my-2 h-px w-full bg-[#ECECEC]" />
