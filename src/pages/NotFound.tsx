import React from 'react'
import { useNavigate } from 'react-router'
import NotFoundImg from '@/assets/404.png'

import { Button } from '@/components/ui/Button'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <img
        src={NotFoundImg}
        alt="404 Not Found"
        className="mb-10 w-full max-w-[500px]"
      />

      <h2 className="mb-4 text-2xl font-bold">
        죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
      </h2>

      <p className="mb-8 leading-relaxed text-gray-500">
        방문하시려는 페이지 주소가 잘못 입력되었거나, 삭제되어 사용할 수
        없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </p>

      <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
    </div>
  )
}

export default NotFound
