'use server'
import { getSelf } from "./auth-service"
import { db } from "./db"

export const getSearch = async (term?: string) => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null
    }

    const streams = await db.stream.findMany({
        where: {
            ...(userId ? {
                user: {
                    NOT: {
                        blocked: {
                            some: {
                                blocked_id: userId
                            }
                        }
                    }
                }
            } : {}),
            OR: [
                {
                    title: {
                        contains: term,
                    }
                },
                {
                    user: {
                        username: {
                            contains: term
                        }
                    }
                }
            ]
        },
        select: {
            user: true,
            id: true,
            title: true,
            is_live: true,
            thumbnail_url: true,
            updated_at: true,
        },
        orderBy: [
            {
                is_live: 'desc'
            },
            {
                updated_at: 'desc'
            }
        ]
    })

    return streams
}
