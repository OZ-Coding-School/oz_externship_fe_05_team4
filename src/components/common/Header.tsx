import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import profileImg from '@/assets/profile.png'
import Login from '@/components/auth/Login'
import { useAuthStore } from '@/store/index'
import { token } from '@/lib/index'

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated)

  // TODO: 로그아웃 커스텀 훅으로 TanStack 사용해서 싹 분리하기
  // await logOut()
  const handleLogout = () => {
    token.clear()
    setUnauthenticated()
  }

  return (
    <header className="w-full">
      <div className="flex h-12 w-full items-center justify-center bg-black px-[10px]">
        <p className="text-sm font-medium text-gray-300">
          🔥 실시간 고민·질문자별 답글 4초 안에 확인
        </p>
      </div>

      <div className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-[960px] items-center justify-between px-6">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-primary text-base font-extrabold tracking-tight"
            >
              OZ 오즈코딩스쿨
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
              <Link to="/community" className="hover:text-black">
                커뮤니티
              </Link>
              <Link to="/" className="hover:text-black">
                질의응답
              </Link>
            </nav>
          </div>

          {/* RIGHT */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Login />
              <Link to="/login" className="hover:text-black">
                로그인
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/signup" className="hover:text-black">
                회원가입
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={profileImg} alt="프로필 이미지" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
