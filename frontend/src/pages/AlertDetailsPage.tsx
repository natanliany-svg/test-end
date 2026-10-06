import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useStore } from '../store/store'
import AlertsMap from '../components/AlertsMap'
import 'leaflet/dist/leaflet.css'

export default function AlertDetailsPage() {
  const { alerts, fetchAlerts } = useStore()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => { if (alerts.length === 0) fetchAlerts() }, [alerts.length]);
  const alertDetails = alerts.find(a => a._id === id)

  if (!alertDetails) {
    return <div>לא נמצאה התראה</div>
  }

  const mapAlerts = [{
    id: alertDetails._id as string,
    displayName: alertDetails.displayName,
    priority: alertDetails.priority,
    lon: alertDetails.lon ||  0,
    lat: alertDetails.lat ||  0
  }]

  return (
    <div style={{ padding: '20px' }}>
      <h1>פרטי התראה: {alertDetails.displayName}</h1>
      <p><strong>תיאור:</strong> {alertDetails.description}</p>
      <p><strong>פיקוד:</strong> {alertDetails.arena}</p>
      <p><strong>רמת דחיפות:</strong> {alertDetails.priority}</p>
      <p><strong>סטטוס:</strong> {alertDetails.status}</p>
      
      <button onClick={() => navigate('/')}>חזרה לרשימה</button>
      <br /><br />
      
      <div style={{ width: '100%', height: '400px' }}>
        <AlertsMap alerts={mapAlerts} />
      </div>
    </div>
  )
}

