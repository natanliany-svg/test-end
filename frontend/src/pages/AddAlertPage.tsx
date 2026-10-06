import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useStore } from '../store/store'

export default function AddAlertPage() {
  const addAlert = useStore(state => state.addAlert)
  const navigate = useNavigate()

  const [error, setError] = useState('');
  const [form, setForm] = useState({
    displayName: '', description: '', priority: 'Low', arena: 'Center', status: 'Active', lon: 50.00, lat: 30.11
  })

  const handleSave = async () => {
    if(!form.displayName || !form.description) return setError('חסר ערך או שהכנסת ערך שגוי')
    await addAlert(form)
    navigate('/')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>הוספת התראה</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <input placeholder="שם התראה" onChange={e => setForm({...form, displayName: e.target.value})} /><br/><br/>
      <input placeholder="תיאור" onChange={e => setForm({...form, description: e.target.value})} /><br/><br/>
      
      <select onChange={e => setForm({...form, priority: e.target.value})}>
        <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
      </select><br/><br/>

      <select onChange={e => setForm({...form, arena: e.target.value})}>
        <option>North</option><option>Center</option><option>South</option>
      </select><br/><br/>

      <select onChange={e => setForm({...form, status: e.target.value})}>
        <option>Active</option><option>Handled</option>
      </select><br/><br/>

      <input type="number" placeholder="Lon" value={form.lon} onChange={e => setForm({...form, lon: Number(e.target.value)})} />
      <input type="number" placeholder="Lat" value={form.lat} onChange={e => setForm({...form, lat: Number(e.target.value)})} /><br/><br/>

      <button onClick={handleSave}>שמור</button>
      <button onClick={() => navigate('/')}>חזור</button>
    </div>
  )
}



