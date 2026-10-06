import * as dal from "../DAL/dal.js"
import { alertSchema } from "../validations/validation.js"

export async function getAlerts(req, res) {
    try {
        const data = await dal.getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "Server erorr" })
    }
}

export async function getAlert(req, res) {
    try {
        const id = req.params.id
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: "Invalid id" })
        
        const alert = await dal.getById(id)
        if (!alert) return res.status(404).json({ error: "Not found" })
        
        res.status(200).json(alert)
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}

export async function createAlert(req, res) {
    try {
        const body = req.body
        const valid = alertSchema.safeParse(body)
        
        if (!valid.success) {
            return res.status(400).json({ error: valid.error.errors })
        }

        const newAlert = await dal.insertAlert(body)
        res.status(201).json(newAlert)
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}

export async function updateAlert(req, res) {
    try {
        const id = req.params.id
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: "Invalid id" })
            
        const body = req.body
        const valid = alertSchema.safeParse(body)
        if (!valid.success) {
            return res.status(400).json({ error: valid.error.errors })
        }
        
        const updated = await dal.updateAlert(id, body)
        if (!updated) return res.status(404).json({ error: "Not found" })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: "Server erorr" })
    }
}

export async function deleteAlert(req, res) {
    try {
        const id = req.params.id
        if (id.length !== 24) return res.status(400).json({ error: "Invalid id" })
        
        const result = await dal.deleteAlert(id)
        if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" })
        
        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}


