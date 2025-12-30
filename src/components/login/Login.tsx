import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Button } from '../ui'
import { useState } from 'react'
import { logIn } from '@/api/auth'

const Login = () => {
  const [selectedNum, setSelectedNum] = useState<string>('')
  const numArr = Array.from({ length: 10 }, (_, index) => index + 1)

  const handleLogin = () => {
    logIn({
      email: `testuser${selectedNum}@ozcodingschool.site`,
      password: 'Ozcoding1234@',
    })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('로그인 실패', error)
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

export default Login
