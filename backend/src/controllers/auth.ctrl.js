import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { getUserByUsername } from '../DAL/user.dal.js'
import { userSchema } from '../validations/validation.js'



export async function login(req, res) {
    let username = req.body.username
    let password = req.body.password
    let user = await getUserByUsername(username)

    if (!user) {
        return res.status(401).json({ error: 'user not find' })
    }
    let check = await bcrypt.compare(password, user.password)
    if (check == false) {
        return res.status(401).json({ error: 'bad pass' })
    }
    let token = jwt.sign({ id: user._id, role: user.role, assignedArena: user.assignedArena }, "testsecret")
    res.status(200).json({ token: token, user: user })
}



export async function createUser(req, res) {
    try {
        const body = req.body
        const valid = userSchema.safeParse(body)
        
        if (!valid.success) {
            return res.status(400).json({ error: valid.error.errors })
        }

        const newAlert = await dal.insertAlert(body)
        res.status(201).json(newAlert)
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}