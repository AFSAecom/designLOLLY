import { Routes, Route, Navigate } from 'react-router-dom'
import Catalogue from './pages/Catalogue'

function App() {
  return (
    <Routes>
      {/* Redirection automatique de la racine vers /catalogue */}
      <Route path="/" element={<Navigate to="/catalogue" />} />

      {/* Route du catalogue */}
      <Route path="/catalogue" element={<Catalogue />} />
    </Routes>
  )
}

export default App
