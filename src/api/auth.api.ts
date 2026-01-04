import {
  LOG_IN_URL,
  LOG_OUT_URL,
  REFRESH_ACCESS_TOKEN_URL,
  USER_URL,
} from '@/constants/index'
import { api } from '@/lib/api'
import { token } from '@/lib/index'
import type { User } from '@/types/user'
import axios from 'axios'

interface LoginPayload {
  email: string
  password: string
}

// 로그인
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

// 액세스 토큰 갱신 (리프레시 토큰 사용)
const refreshAccessToken = async (): Promise<string> => {
  const tokenResponse = await axios.post<{ access_token: string }>(
    REFRESH_ACCESS_TOKEN_URL,
    {},
    { withCredentials: true }
  )
  const { access_token: accessToken } = tokenResponse.data
  return accessToken
}

// 유저 정보 조회
const fetchMe = async (): Promise<User> => {
  const userResponse = await api.get<User>(USER_URL)
  return userResponse.data
}

// 로그아웃
const logOut = async (): Promise<void> => {
  await axios.post(LOG_OUT_URL)
}

export { logIn, refreshAccessToken, fetchMe, logOut }
