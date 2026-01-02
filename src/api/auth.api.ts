import { LOG_IN_URL, REFRESH_ACCESS_TOKEN_URL, USER_URL } from '@/data/index'
import { api } from '@/lib/api'
import { token } from '@/lib/index'
import type { User } from '@/types/user'
import axios from 'axios'

interface LoginPayload {
  email: string
  password: string
}

const logIn = async (payload: LoginPayload): Promise<User> => {
  // access token 발급
  const tokenResponse = await api.post<{ access_token: string }>(
    LOG_IN_URL,
    payload
  )
  const { access_token: accessToken } = tokenResponse.data
  token.set(accessToken)

  // 유저 정보 조회
  return fetchMe()
}

const refreshAccessToken = async (): Promise<string> => {
  const tokenResponse = await axios.post<{ access_token: string }>(
    REFRESH_ACCESS_TOKEN_URL,
    {},
    { withCredentials: true }
  )
  const { access_token: accessToken } = tokenResponse.data
  return accessToken
}

const fetchMe = async (): Promise<User> => {
  const userResponse = await api.get<User>(USER_URL)
  return userResponse.data
}

// TODO: 로그아웃 API 구현 후 import & export 추가, LOG_OUT_URL도 추가
// const logOut = async (): Promise<void> => {
//   await axios.post(LOG_OUT_URL, {
//     headers: {
//       Authorization: `Bearer ${token.get()}`,
//     },
//   })
// }

export { logIn, refreshAccessToken, fetchMe }
