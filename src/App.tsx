import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Catalogue from './pages/Catalogue'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/catalogue" element={<Catalogue />} />
        {/* Tu pourras ajouter d'autres routes ici plus tard */}
      </Routes>
    </Router>
  )
}

export default App
