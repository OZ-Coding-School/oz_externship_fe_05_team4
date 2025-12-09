import {
  format,
  formatDistanceToNow,
  parseISO,
  subDays,
  isWithinInterval,
} from 'date-fns'
import { ko } from 'date-fns/locale'

// 입력값을 Date 객체로 변환
export function toDate(input: string | Date): Date {
  return input instanceof Date ? input : parseISO(input)
}

// -------------------------------------------------------
// 📌 1. 날짜 포맷
// -------------------------------------------------------
export function formatDate(input: string | Date, fmt = 'yyyy.MM.dd') {
  return format(toDate(input), fmt)
}

export function formatDateTime(input: string | Date) {
  return format(toDate(input), 'yyyy.MM.dd HH:mm')
}

// -------------------------------------------------------
// 📌 2. 상대 시간 (Q&A / 챗봇 공용)
// -------------------------------------------------------
export function timeAgo(input: string | Date) {
  return formatDistanceToNow(toDate(input), {
    addSuffix: true,
    locale: ko,
  })
}

// -------------------------------------------------------
// 📌 3. 정렬 (Generic 사용)
// -------------------------------------------------------
// 리스트의 타입 T
// 날짜 필드 K는 반드시 T의 key 중 string | Date 형태여야 함
export function sortByNewest<T, K extends keyof T>(list: T[], key: K): T[] {
  return [...list].sort(
    (a, b) =>
      toDate(b[key] as unknown as string | Date).getTime() -
      toDate(a[key] as unknown as string | Date).getTime()
  )
}

export function sortByOldest<T, K extends keyof T>(list: T[], key: K): T[] {
  return [...list].sort(
    (a, b) =>
      toDate(a[key] as unknown as string | Date).getTime() -
      toDate(b[key] as unknown as string | Date).getTime()
  )
}

// -------------------------------------------------------
// 📌 4. 기간 필터 (Generic)
// -------------------------------------------------------
export function filterLastNDays<T, K extends keyof T>(
  list: T[],
  days: number,
  key: K
): T[] {
  const now = new Date()
  const start = subDays(now, days)

  return list.filter((item) => {
    const date = toDate(item[key] as unknown as string | Date)
    return isWithinInterval(date, { start, end: now })
  })
}

export function filterToday<T, K extends keyof T>(list: T[], key: K) {
  return filterLastNDays(list, 1, key)
}

export function filterLast7Days<T, K extends keyof T>(list: T[], key: K) {
  return filterLastNDays(list, 7, key)
}

export function filterLast30Days<T, K extends keyof T>(list: T[], key: K) {
  return filterLastNDays(list, 30, key)
}

// -------------------------------------------------------
// 📌 5. 챗봇 전용 날짜/시간 포맷
// -------------------------------------------------------
export function formatChatTime(input: string | Date) {
  return format(toDate(input), 'a hh:mm', { locale: ko })
}

export function formatChatDateHeader(input: string | Date) {
  return format(toDate(input), 'yyyy년 MM월 dd일 EEEE', { locale: ko })
}
