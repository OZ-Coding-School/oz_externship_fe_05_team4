import { token } from '@/lib/index'
import { refreshAccessToken, fetchMe } from '@/api/auth.api'
import { useAuthStore } from '@/store/auth.store'

export async function bootstrapAuth() {
  const { setAuthenticated, setUnauthenticated } = useAuthStore.getState()

  try {
    const accessToken = await refreshAccessToken()
    token.set(accessToken)

    const user = await fetchMe()
    setAuthenticated(user)
  } catch {
    token.clear()
    setUnauthenticated()
  }
}
