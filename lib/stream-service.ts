import { db } from "@/lib/db";

export const getStreamByUserID = async (userID: string) => {
    const stream = await db.stream.findUnique({
        where: { user_id: Number(userID) },
        include: {
            category: true,
        }
    });

    return stream
}

export const fetchCategoryByStreamId = async (stream_id: string) => {
    try {
        const stream = await db.stream.findUnique({
            where: {
                id: Number(stream_id)
            },
            include: {
                category: true
            }
        })

        return stream?.category
    } catch {
        throw new Error("Internal Server Error")
    }
}

