import { Routes, Route } from 'react-router-dom'
import Catalogue from './pages/Catalogue'

function App() {
  return (
    <Routes>
      <Route path="/catalogue" element={<Catalogue />} />
    </Routes>
  )
}

export default App
