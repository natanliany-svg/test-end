import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3200/api/alerts'

interface Alert {
  _id?: string
  displayName: string
  description: string
  priority: string
  arena: string
  status: string
  lon?: number
  lat?: number
  
  
}

interface AppStore {
  alerts: Alert[]
  fetchAlerts: () => Promise<void>
  addAlert: (alert: any) => Promise<void>
  updateAlert: (id: string, alert: any) => Promise<void>
  deleteAlert: (id: string) => Promise<void>
}

export const useStore = create<AppStore>((set, get) => ({
  alerts: [],
  fetchAlerts: async () => {
    try {
      const res = await axios.get(API_URL)
      set({ alerts: res.data })
    } catch (err) {
      console.error(err)
    }
  },
  addAlert: async (alert) => {
    await axios.post(API_URL, alert)
    get().fetchAlerts()
  },
  updateAlert: async (id, alert) => {
    await axios.put(`${API_URL}/${id}`, alert)
    get().fetchAlerts()
  },
  deleteAlert: async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    get().fetchAlerts()
  }
}))
