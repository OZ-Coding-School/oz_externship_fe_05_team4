import { LOG_IN_URL, USER_URL } from '@/data/index'
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
  return fetchMe()
}

// TODO: Axios 인스턴스 구현 & API 오류 수정 후에 주석 해제 (리프레시 토큰은 헤더로 받기), import & export도 추가
// const refreshAccessToken = async (): Promise<string> => {
//   const tokenResponse = await api.post<{ access_token: string }>(
//     REFRESH_ACCESS_TOKEN_URL
//   )
//   const { access_token: accessToken } = tokenResponse.data
//   return accessToken
// }

// TODO: Axios 인스턴스 추가 후 리팩토링
const fetchMe = async (): Promise<User> => {
  const userResponse = await axios.get<User>(USER_URL, {
    headers: {
      Authorization: `Bearer ${token.get()}`,
    },
  })
  return userResponse.data
}

// TODO: 로그아웃 API가 있는게 맞음 (혹시 구현하지 않는것으로 결정되면 삭제), 구현할 경우 import & export도 추가, LOG_OUT_URL도 추가
// const logOut = async (): Promise<void> => {
//   await axios.post(LOG_OUT_URL, {
//     headers: {
//       Authorization: `Bearer ${token.get()}`,
//     },
//   })
// }

export { logIn, fetchMe }
