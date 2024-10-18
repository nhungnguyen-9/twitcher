import { db } from "./db"

export const saveMessages = async (content: string, commenter: string, user_id: string, stream_id: string) => {
    try {
        return await db.comment.create({
            data: {
                content,
                commenter,
                user_id: BigInt(user_id),
                stream_id: BigInt(stream_id),
            },
        })
    } catch {
        throw new Error("Failed to save message");
    }
}

export const getMessages = async (stream_id: string) => {
    try {
        return await db.comment.findMany({
            where: { stream_id: BigInt(stream_id) },
            orderBy: {
                created_at: 'asc'
            },
            include: {
                user: true
            }
        })
    } catch {
        throw new Error("Failed to fetch messages");
    }
}