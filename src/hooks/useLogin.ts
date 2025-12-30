import { logIn } from '@/api/index'
import { useAuthStore } from '@/store/index'
import type { User } from '@/types/index'
import { useMutation } from '@tanstack/react-query'

interface LoginPayload {
  email: string
  password: string
}

export function useLogin() {
  const { setAuthenticated } = useAuthStore()

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
