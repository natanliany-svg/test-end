import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import AddAlertPage from './pages/AddAlertPage'
import EditAlertPage from './pages/EditAlertPage'
import AlertDetailsPage from './pages/AlertDetailsPage'
import Login from './pages/Login'
import { useStore } from './store/store'


function App() {
  let usr = useStore(state => state.user)

  return (
    <BrowserRouter>
      {usr && <div style={{background: 'lightgray'}}> מחובר: {usr.username} ({usr.roll})</div>}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAlertPage />} />
        <Route path="/edit/:id" element={<EditAlertPage />} />
        <Route path="/alerts/:id" element={<AlertDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


