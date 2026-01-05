import axios from 'axios'

export const getErrorMessage = (
  error: unknown,
  fallback = '요청에 실패했습니다.'
) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (typeof data === 'object' && data !== null && 'message' in data) {
      const msg = (data as { message?: unknown }).message
      if (typeof msg === 'string' && msg.trim()) return msg
    }
    return error.message || fallback
  }
  if (error instanceof Error) return error.message || fallback
  return fallback
}
