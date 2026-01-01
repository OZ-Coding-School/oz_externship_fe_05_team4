export type ChatRole = 'user' | 'assistant'

export interface ChatMessageType {
  id: number
  role: ChatRole
  content: string
  status?: 'loading' | 'error'
}
export type ChatbotEntry =
  | { type: 'floating' }
  | { type: 'followup'; questionId: number }
