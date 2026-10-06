import { db } from "../config/db.js"
import { ObjectId } from "mongodb"





export async function getAll() {
    return await db.collection("alerts").find({}).toArray()
}

export async function getById(id) {
    return await db.collection("alerts").findOne({ _id: new ObjectId(id) })
}

export async function insertAlert(data) {
    const res = await db.collection("alerts").insertOne(data)
    return await db.collection("alerts").findOne({ _id: res.insertedId })
}

export async function deleteAlert(id) {
    return await db.collection("alerts").deleteOne({ _id: new ObjectId(id) })
}

export async function updateAlert(id, data) {
    await db.collection("alerts").updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    )
    return await db.collection("alerts").findOne({ _id: new ObjectId(id) })
}
