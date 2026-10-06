import { any, email, z } from "zod"



export const alertSchema = z.object({
    displayName: z.string().min(1),
    description: z.string().min(1),
    priority: z.enum(["Low", "Medium", "High", "Critical"]),
    arena: z.enum(["North", "South", "Center"]),
    status: z.enum(["Active", "Handled"]),
    lon: z.number(),
    lat: z.number()
})


export const userSchema = z.object({
    id:z.number(),
    username:z.string().min(1),
    password:z.string(),
    email: z.email(),
    role: z.enum(["arena_user" , "general" , "admin"]),
    assignedArena: z.enum(["North" , "South","Center","All"])
})