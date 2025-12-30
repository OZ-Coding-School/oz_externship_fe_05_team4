import type { User } from '@/types/auth'
import { create } from 'zustand'

interface AuthState {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: User | null

  setAuthenticated: (user: User) => void
  setUnauthenticated: () => void
  setLoading: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,

  setAuthenticated: (user) =>
    set({
      status: 'authenticated',
      user,
    }),

  setUnauthenticated: () =>
    set({
      status: 'unauthenticated',
      user: null,
    }),

  setLoading: () =>
    set({
      status: 'loading',
    }),
}))
