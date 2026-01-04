import { logIn, logOut } from '@/api/auth.api'
import { token } from '@/lib'
import { useAuthStore } from '@/store/auth.store'
import type { User } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

// 로그인
interface LoginPayload {
  email: string
  password: string
}

export function useLogin() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

  return useMutation<User, Error, LoginPayload>({
    mutationFn: logIn,
    onSuccess: (user) => {
      setAuthenticated(user)
    },
    onError: (error) => {
      // TODO: 토스트 메세지 정도로 처리하기
      console.error('로그인 실패', error)
    },
  })
}

// 로그아웃
export function useLogout() {
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated)

  return useMutation<void, Error>({
    mutationFn: logOut,
    onSuccess: () => {
      setUnauthenticated()
      token.clear()
    },
  })
}
