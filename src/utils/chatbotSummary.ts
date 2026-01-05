export function buildChatbotSummary(input: string, maxLength = 30) {
  if (!input) return 'AI 질문'

  const trimmed = input.replace(/\s+/g, ' ').trim()

  if (trimmed.length <= maxLength) return trimmed

  return trimmed.slice(0, maxLength - 1) + '…'
}
