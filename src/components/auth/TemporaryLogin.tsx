import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useLogin } from '@/hooks/index'

const TemporaryLogin = () => {
  const [selectedNum, setSelectedNum] = useState<string>('')
  const numArr = Array.from({ length: 10 }, (_, index) => index + 1)

  // loginMutation.isPending
  // loginMutation.isError
  // loginMutation.error
  // 이런 것들로 로딩 스피너 또는 에러 메세지 처리하기
  const loginMutation = useLogin()

  const handleLogin = () => {
    loginMutation.mutate({
      email: `testuser${selectedNum}@ozcodingschool.site`,
      password: 'Ozcoding1234@',
    })
  }

  return (
    <div className="z-10 flex items-center gap-2 px-4">
      <Select value={selectedNum} onValueChange={setSelectedNum}>
        <SelectTrigger className="h-7 w-14 cursor-pointer rounded-md border-none bg-gray-200 px-3 text-sm">
          <SelectValue placeholder="n" />
        </SelectTrigger>
        <SelectContent className="border-none">
          {numArr.map((num) => (
            <SelectItem key={num} value={num.toString()}>
              <span className="text-black">{num.toString()}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleLogin}
        className="h-7 w-7 cursor-pointer rounded-md"
      >
        L
      </Button>
    </div>
  )
}

export default TemporaryLogin
