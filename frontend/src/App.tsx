import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import AddAlertPage from './pages/AddAlertPage'
import EditAlertPage from './pages/EditAlertPage'
import AlertDetailsPage from './pages/AlertDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAlertPage />} />
        <Route path="/edit/:id" element={<EditAlertPage />} />
        <Route path="/alerts/:id" element={<AlertDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


