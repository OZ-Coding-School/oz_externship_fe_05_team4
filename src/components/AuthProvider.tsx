import { bootstrapAuth } from '@/lib/index'
import { useEffect } from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    bootstrapAuth()
  }, [])

  return children
}

export default AuthProvider
