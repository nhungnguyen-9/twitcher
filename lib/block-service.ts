import { db } from "./db"
import { getSelf } from "./auth-service"

export const getBlockUsers = async () => {
    try {
        const self = await getSelf();

        return db.block.findMany({
            where: {
                blocker_id: self.id,
            },
            include: {
                blocked: true
            }
        })
    } catch {
        return []
    }
}

export const existedBlocking = async (id: string) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id: Number(id) }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot block yourself")
    }

    return db.block.findFirst({
        where: { blocker_id: self.id, blocked_id: otherUser.id }
    })
}

export const blockUser = async (id: string) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id: Number(id) }
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
            blocked: true,
            blocker: true
        }
    })
}

export const unblockUser = async (id: string) => {
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
                blocked: true,
            }
        }
    )
}

export const getBlockedUsers = async () => {
    const self = await getSelf()

    const blockedUsers = await db.block.findMany({
        where: {
            blocker_id: self.id,
        },
        include: {
            blocked: true
        }
    })

    return blockedUsers
}
