import {db} from "./db"
import {getSelf} from "./auth-service"

export const getBlockUsers = async () => {
    try {
        const self = await getSelf();

        return db.block.findMany({
            where: {
                blocker_id: self.id,
            },
            include: {
                blocking: true
            }
        })
    } catch {
        return []
    }
}

export const existedBlocking = async (id: number) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot block yourself")
    }

    return db.block.findFirst({
        where: {blocker_id: self.id, blocking_id: otherUser.id}
    })
}

export const blockUser = async (id: number) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if (!otherUser) {
        throw new Error("User not found")
    }
    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself")
    }

    const existingFollow = await db.block.findFirst({
        where: {
            blocker_id: self.id,
            blocking_id: otherUser.id,
        }
    })

    if (existingFollow) {
        throw new Error("Already following")
    }

    return db.follow.create({
        data: {
            follower_id: self.id,
            following_id: otherUser.id,
        },
        include: {
            following: true,
            follower: true
        }
    })
}

export const unblockUser = async (id: number) => {
    const existingBlock = await existedBlocking(id)
    if (!existingBlock) {
        throw new Error("Not blocking")
    }
    const unfollow = await db.block.delete(
        {
            where: {
                id: existingBlock.id
            },
            include: {
                blocking: true,
            }
        }
    )

    return unfollow
}


