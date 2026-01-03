import { Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { IconBtn } from './ToolbarPrimitives'

export default function InsertControls({
  onInsertLink,
  onOpenImagePicker,
}: {
  onInsertLink: () => void
  onOpenImagePicker: () => void
}) {
  return (
    <>
      <IconBtn onClick={onInsertLink}>
        <LinkIcon size={18} />
      </IconBtn>
      <IconBtn onClick={onOpenImagePicker}>
        <ImageIcon size={18} />
      </IconBtn>
    </>
  )
}
