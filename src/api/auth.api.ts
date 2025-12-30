import { LOG_IN_URL, REFRESH_ACCESS_TOKEN_URL, USER_URL } from '@/data/index'
import { token } from '@/lib/index'
import type { User } from '@/types/user'
import axios from 'axios'

interface LoginPayload {
  email: string
  password: string
}

const logIn = async (payload: LoginPayload): Promise<User> => {
  // access token 발급
  const tokenResponse = await axios.post<{ access_token: string }>(
    LOG_IN_URL,
    payload
  )
  const { access_token: accessToken } = tokenResponse.data
  token.set(accessToken)

  // 유저 정보 조회
  // TODO: axios 인스턴스 추가 후 리팩토링
  const userResponse = await axios.get<User>(USER_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return userResponse.data
}

// TODO: Axios 인스턴스 구현 & API 오류 수정 후에 주석 해제 (리프레시 토큰은 헤더로 받기), export도 추가
// const refreshAccessToken = async (): Promise<string> => {
//   const tokenResponse = await api.post<{ access_token: string }>(
//     REFRESH_ACCESS_TOKEN_URL
//   )
//   const { access_token: accessToken } = tokenResponse.data
//   return accessToken
// }

export { logIn }
