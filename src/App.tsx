import './App.css'
import Header from '@/components/common/Header'
import { BrowserRouter, Routes, Route } from 'react-router'
import {
  MainPage,
  NotFound,
  DetailPage,
  CreatePage,
  QuestionEditPage,
} from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mt-8 space-y-2"></div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Question/Detail/:id" element={<DetailPage />} />
        <Route path="/Question/Create" element={<CreatePage />} />
        <Route path="/Question/Edit/:id" element={<QuestionEditPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
