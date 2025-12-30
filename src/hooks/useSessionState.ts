import { useEffect, useState } from 'react'

export function useSessionState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const saved = sessionStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}
