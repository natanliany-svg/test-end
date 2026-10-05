import { Router } from "express"
import { getAlerts, getAlert, createAlert, updateAlert, deleteAlert } from "../controllers/ctrl.js"



const router = Router()




router.get('/', getAlerts)

router.get('/:id', getAlert)

router.post('/', createAlert)

router.delete('/:id', deleteAlert)

router.put('/:id', updateAlert)



export default router