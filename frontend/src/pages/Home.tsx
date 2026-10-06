import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useStore } from '../store/store'
import AlertsMap from '../components/AlertsMap'
import 'leaflet/dist/leaflet.css'

export default function Home() {
  const { alerts, fetchAlerts, deleteAlert } = useStore()
  const [name, setName] = useState('')
  const [arenaFilter, setArenaFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')

  useEffect(() => {
    fetchAlerts()
  }, [])

  let filtered = alerts
  if (name) {
    filtered = filtered.filter(a => a.displayName.includes(name))
  }
  if (arenaFilter !== 'ALL') {
    filtered = filtered.filter(a => a.arena === arenaFilter)
  }
  if (priorityFilter !== 'ALL') {
    filtered = filtered.filter(a => a.priority === priorityFilter)
  }

  const mapAlerts = filtered.map((a) => ({
    id: a._id || Math.random().toString(),
    displayName: a.displayName,
    priority: a.priority,
    lon: a.lon || a.x || 0,
    lat: a.lat || a.y || 0
  }))

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ color: 'darkblue' }}>Tzofia System</h1>
      <Link to="/add"><button style={{ marginBottom: '15px' }}>+ הוסף התראה חדשה</button></Link>
      
      <div style={{ marginBottom: '15px' }}>
        <input type="text" placeholder="חיפוש שם..." value={name} onChange={e => setName(e.target.value)} style={{ marginRight: '10px' }} />
        <select value={arenaFilter} onChange={(e) => setArenaFilter(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="ALL">All Arenas</option>
          <option value="North">North</option>
          <option value="Center">Center</option>
          <option value="South">South</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="ALL">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div style={{ display: 'block' }}>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <AlertsMap alerts={mapAlerts} />
        </div>
        
        <div style={{ height: '400px', overflow: 'scroll' }}>
          {filtered.map(alert => (
            <div key={alert._id} style={{ border: '2px solid black', padding: '5px', margin: '5px 0' }}>
              <h3>{alert.displayName} - {alert.priority}</h3>
              <p>{alert.description}</p>
              <p>Status: {alert.status}</p>
              <div style={{ marginTop: '10px' }}>
                <Link to={`/alerts/${alert._id}`}><button style={{ marginRight: '5px' }}>פרטים</button></Link>
                <Link to={`/edit/${alert._id}`}><button style={{ marginRight: '5px' }}>ערוך</button></Link>
                <button onClick={() => { if(alert._id) deleteAlert(alert._id) }}>מחק</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}