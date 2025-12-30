let accessToken: string | null = null

export const token = {
  set(tokenValue: string) {
    accessToken = tokenValue
  },
  get() {
    return accessToken
  },
  clear() {
    accessToken = null
  },
}
