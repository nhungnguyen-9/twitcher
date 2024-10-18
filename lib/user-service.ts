import { db } from "./db"

export const getUserByUserName = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true,
            email: true,
            external_user_id: true,
            username: true,
            bio: true,
            image_url: true,
            streams: {
                select: {
                    id: true,
                    title: true,
                    thumbnail_url: true,
                    is_live: true,
                    is_chat_enabled: true,
                    is_chat_followers_only: true,
                    is_chat_delayed: true
                }
            },
            _count: {
                select: {
                    following: true
                }
            }
        }
    })

    if (!user) {
        return null
    }

    return user;
}


export const getUserById = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {id: Number(userId)},
        include: {streams: true}
    })

    return user
}