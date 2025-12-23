export type ChatRole = 'ai' | 'user'

export interface Message {
  id: number
  role: ChatRole
  content: string
}
