interface Props {
  onClick: () => void
}

export default function ChatbotFloatingButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-primary-400 fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl"
      aria-label="AI 챗봇 열기"
    >
      🤖
    </button>
  )
}
