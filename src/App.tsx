import './App.css'
import Header from '@/components/common/Header'
import { BrowserRouter, Routes, Route } from 'react-router'
import {
  MainPage,
  NotFound,
  JaeMinPage,
  JaeEunPage,
  HanbyeolPage,
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mt-8 space-y-2"></div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/JaeMin" element={<JaeMinPage />} />
        <Route path="/JaeEun" element={<JaeEunPage />} />
        <Route path="/HanByeol" element={<HanbyeolPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
