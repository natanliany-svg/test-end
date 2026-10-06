import { MongoClient } from "mongodb"
import "dotenv/config"

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017"
const client = new MongoClient(url)

let db

export async function connectDB() {
    try {
        await client.connect()
        db = client.db("test-end-db")
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error("MongoDB error", err.message)
        process.exit(1)
    }
}

export { db }


