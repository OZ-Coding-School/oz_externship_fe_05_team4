export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface User {
  id: number
  email: string
  name: string
  nickname: string
  phone_number: string
  gender: string
  birthday: string // 테이블 명세서엔 없는데 '/api/v1/accounts/me' 에서는 넘겨줌.
  is_active: boolean
  is_staff?: boolean
  role: 'TA' | 'LC' | 'OM' | 'ST' | 'AD' | 'U'
  created_at: string
  updated_at: string
  profile_image_url?: string // 테이블 명세서엔 있는데 '/api/v1/accounts/me' 에서는 안 넘겨줌.
}

// role enum (백엔드 코드에서 훔쳐옴)
// class RoleChoices(models.TextChoices):
//     TA = "TA", "Teaching Assistant"
//     LC = "LC", "Learning Coach"
//     OM = "OM", "Office Manager"
//     ST = "ST", "Student"
//     AD = "AD", "Administrator"
//     USER = "U", "User"
