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
        where: {blocker_id: self.id, blocked_id: otherUser.id}
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
        throw new Error("Cannot block yourself")
    }

    const existingBlock = await db.block.findFirst({
        where: {
            blocker_id: self.id,
        }
    })

    if (existingBlock) {
        throw new Error("Already blocking this user")
    }

    return db.block.create({
        data: {
            blocker_id: self.id,
            blocked_id: otherUser.id,
        },
        include: {
            blocking: true,
            blocker: true
        }
    })
}

export const unblockUser = async (id: number) => {
    const existingBlock = await existedBlocking(id)
    if (!existingBlock) {
        throw new Error("Not blocking")
    }
    return db.block.delete(
        {
            where: {
                id: existingBlock.id
            },
            include: {
                blocking: true,
            }
        }
    );
}


