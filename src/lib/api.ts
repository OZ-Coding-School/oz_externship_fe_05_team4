import axios from 'axios'
import { token } from '@/lib/index'
import { refreshAccessToken } from '@/api/index'
import { useAuthStore } from '@/store/index'
import { BASE_URL } from '@/constants/index'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // refresh token 쿠키용
})

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const accessToken = token.get()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// 응답 인터셉터
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean
    _skipAuth?: boolean
  }
}

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 401 에러가 아니거나, 이미 재시도한 경우 또는 인증 정보가 없으면 오류 반환
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest._skipAuth ||
      !originalRequest.headers?.Authorization
    ) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      // 리프레시 토큰 갱신 중이 아니라면 리프레시 토큰 갱신
      if (!isRefreshing) {
        isRefreshing = true
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false
        })
      }

      if (!refreshPromise) {
        throw new Error('리프레시 토큰 갱신 실패')
      }

      // 리프레시 토큰 갱신 완료 후 새로운 액세스 토큰 설정
      const newAccessToken = await refreshPromise!
      token.set(newAccessToken)
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      // 리프레시 토큰 갱신 완료 후 원래 요청 재시도
      return api(originalRequest)
    } catch {
      // 리프레시 토큰 갱신 실패 시 토큰 정리 및 인증 상태 변경
      token.clear()
      useAuthStore.getState().setUnauthenticated()
      return Promise.reject(error)
    }
  }
)
