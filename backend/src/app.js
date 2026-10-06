import express from "express"
import cors from "cors"
import "dotenv/config"

import { connectDB } from "./config/db.js"
import routes from "./routes/routes.js"
import authRoutes from "./routes/auth.routes.js"



const app = express()
const PORT = process.env.PORT || 3001





app.use(cors())
app.use(express.json())


app.use('/api/alerts', routes)

app.use('/api/auth', authRoutes)





connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server runing on port ${PORT}`)
    })
})

