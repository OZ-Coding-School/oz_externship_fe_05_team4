import Header from '@/components/common/Header'
import { BrowserRouter } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white p-8">
        <Header />

        <div className="mt-10">
          <p>여기는 본문 영역입니다.</p>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
