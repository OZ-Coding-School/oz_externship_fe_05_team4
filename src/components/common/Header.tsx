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

export default function Header() {
  //Zustand로 대체 예정
  const isLoggedIn = false

  return (
    <header className="flex w-full flex-col">
      <div className="w-full bg-black px-6 py-1 text-sm text-gray-300">
        <p className="truncate">🔥 실시간 고민·질문자별 답글 4초 안에 확인</p>
      </div>

      <div className="flex h-14 w-full items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold">
            OZ 오즈코딩스쿨
          </Link>

          <nav className="flex items-center gap-5 text-sm text-gray-700">
            <Link to="/community" className="hover:text-black">
              커뮤니티
            </Link>
            <Link to="/" className="hover:text-black">
              질의응답
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-3 text-sm">
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
              <DropdownMenuItem className="text-red-600">
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
