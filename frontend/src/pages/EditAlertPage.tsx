import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useStore } from '../store/store'

export default function EditAlertPage() {
  const { alerts, updateAlert, fetchAlerts } = useStore()
  const navigate = useNavigate()
  const { id } = useParams()

  const [error, setError] = useState('');
  const [form, setForm] = useState({
    displayName: '', description: '', priority: 'Low', arena: 'Center', status: 'Active', lon: 34.78, lat: 32.08
  })

  useEffect(() => { if (alerts.length === 0) fetchAlerts(); }, [alerts.length]);
  useEffect(() => {
    const alertToEdit = alerts.find(a => a._id === id)
    if (alertToEdit) {
      setForm({
        displayName: alertToEdit.displayName,
        description: alertToEdit.description,
        priority: alertToEdit.priority,
        arena: alertToEdit.arena,
        status: alertToEdit.status,
        lon: alertToEdit.lon  || 30.11,
        lat: alertToEdit.lat  || 50.00
      })
    }
  }, [alerts, id])

  const handleSave = async () => {
    if(!form.displayName || !form.description) return setError('אחד או יותר מהערכים אינו תקין')
    if (id) {
        await updateAlert(id, form)
    }
    navigate('/')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>עריכת התראה</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <input placeholder="שם התראה" value={form.displayName} onChange={e => setForm({...form, displayName: e.target.value})} /><br/><br/>
      <input placeholder="תיאור" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /><br/><br/>
      
      <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
        <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
      </select><br/><br/>

      <select value={form.arena} onChange={e => setForm({...form, arena: e.target.value})}>
        <option>North</option><option>Center</option><option>South</option>
      </select><br/><br/>

      <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
        <option>Active</option><option>Handled</option>
      </select><br/><br/>

      <input type="number" placeholder="Lon" value={form.lon} onChange={e => setForm({...form, lon: Number(e.target.value)})} />
      <input type="number" placeholder="Lat" value={form.lat} onChange={e => setForm({...form, lat: Number(e.target.value)})} /><br/><br/>

      <button onClick={handleSave}>עדכן</button>
      <button onClick={() => navigate('/')}>חזור</button>
    </div>
  )
}


