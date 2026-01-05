export type ChatRole = 'user' | 'assistant'

export interface ChatMessageType {
  id: number
  role: ChatRole
  content: string
  status?: 'loading' | 'error'
}
export interface ChatbotEntry {
  questionId: number
  type: 'floating'
}

export type ChatMode = 'select' | 'chat'

export interface CreateChatbotSessionPayload {
  title: string
  using_model: string
  question?: number
}
