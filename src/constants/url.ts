const BASE_URL = import.meta.env.VITE_API_BASE_URL

const LOG_IN_URL = `/accounts/login`

const USER_URL = `/accounts/me`

const LOG_OUT_URL = `/accounts/logout`

const REFRESH_ACCESS_TOKEN_URL = `/accounts/refresh`

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

export {
  BASE_URL,
  LOG_IN_URL,
  USER_URL,
  LOG_OUT_URL,
  REFRESH_ACCESS_TOKEN_URL,
  IMG_BASE_URL,
}
