import { Link } from 'react-router'
import { Avatar, AvatarImage } from '@/components/ui/index'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import profileImg from '@/assets/profile.png'
// import TemporaryLogin from '@/components/auth/TemporaryLogin'
import { useAuthStore } from '@/store/index'
import { useLogout } from '@/hooks/useLogin'

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  const { mutate: logout } = useLogout()

  return (
    <header className="w-full">
      <div className="flex h-8 w-full items-center justify-center bg-black">
        <p className="text-sm font-medium text-gray-300">
          🔥 실시간 고민·질문자별 답글 4초 안에 확인
        </p>
      </div>

      <div className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-[960px] items-center justify-between px-6">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <a
              href="https://my.ozcodingschool.site/"
              className="text-gray-primary text-base font-extrabold tracking-tight"
            >
              OZ 오즈코딩스쿨
            </a>

            <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
              <a
                href="https://community.ozcodingschool.site/"
                className="hover:text-black"
              >
                커뮤니티
              </a>
              <Link to="/" className="hover:text-black">
                질의응답
              </Link>
            </nav>
          </div>

          {/* RIGHT */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-3 text-sm text-gray-700">
              {/* <TemporaryLogin /> */}
              <a
                href="https://my.ozcodingschool.site/login"
                className="hover:text-black"
              >
                로그인
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="https://my.ozcodingschool.site/signup"
                className="hover:text-black"
              >
                회원가입
              </a>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 cursor-pointer rounded-full focus-visible:outline-none">
                <Avatar>
                  <AvatarImage src={profileImg} alt="프로필 이미지" />
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => logout()}
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
