import { getSelf } from "./auth-service"
import { db } from "./db"

export const getStreams = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null
    }

    let streams: any = []

    if (userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocked: {
                            some: {
                                blocked_id: userId,
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                is_live: true,
                user: true,
                title: true,
                thumbnail_url: true,
            },
            orderBy: [
                {
                    is_live: "desc",

                },
                {
                    updated_at: "desc"
                }
            ]
        })
    } else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                is_live: true,
                user: true,
                title: true,
                thumbnail_url: true,
            },
            orderBy: [
                {
                    is_live: "desc",

                },
                {
                    updated_at: "desc"
                }
            ]
        })
    }
    return streams
}