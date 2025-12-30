export interface Author {
  name: string
  profile: string
}

export interface Question {
  id: number
  categories: string[]
  title: string
  preview: string
  answers: number
  views: number
  time: string
  thumbnail?: string | null
  author: Author
}

export type QuestionSort = 'latest' | 'oldest'
export type QuestionTab = 'all' | 'answered' | 'waiting'
