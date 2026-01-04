const BASE_URL = import.meta.env.VITE_BASE_URL

const LOG_IN_URL = `/accounts/login`

const USER_URL = `/accounts/me`

const LOG_OUT_URL = `${BASE_URL}/accounts/logout`

const REFRESH_ACCESS_TOKEN_URL = `${BASE_URL}/accounts/refresh`

export { BASE_URL, LOG_IN_URL, USER_URL, LOG_OUT_URL, REFRESH_ACCESS_TOKEN_URL }
