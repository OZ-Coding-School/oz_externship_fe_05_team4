import { setupServer } from 'msw/node'
import { QuestionCreateHandlers } from './QuestionCreateHandlers'

export const server = setupServer(...QuestionCreateHandlers)
