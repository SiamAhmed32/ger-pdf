import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CertificatePage from './pages/CertificatePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/certificate" element={<CertificatePage />} />
    </Routes>
  )
}

export default App
