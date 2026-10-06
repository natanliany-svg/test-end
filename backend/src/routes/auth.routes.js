import express from 'express'
import { login } from '../controllers/auth.ctrl.js'
import { createUser} from '../controllers/auth.ctrl.js'

const router = express.Router()



router.post('/login', login)


//router.post('/register' , createUser)



export default router
