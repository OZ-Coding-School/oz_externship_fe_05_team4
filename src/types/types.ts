export type ChatRole = 'user' | 'ai'

export interface ChatMessageType {
  id: number
  role: ChatRole
  content: string
}
