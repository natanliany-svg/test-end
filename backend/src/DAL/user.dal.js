import { db } from "../config/db.js"


export async function getUserByUsername(username) {
  let u = await db.collection("users").findOne({ username: username })
    return u
  
}
