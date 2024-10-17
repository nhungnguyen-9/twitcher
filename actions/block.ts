"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/follow-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const onBlock = async (id: string) => {
    const self = await getSelf()
    try {
        const blockedUser = await blockUser(id);
        revalidatePath("/")

        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocked.username}`)
        }

        return blockedUser
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}

export const onUnblock = async (id: string) => {
    try {
        const unblockedUser = await unblockUser(id)
        revalidatePath("/")
        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`)
        }

        return unblockedUser
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: { id: Number(id) }
        })

        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id == self.id) {
            return false
        }

        const existingBlock = await db.block.findFirst({
            where: {
                blocker_id: otherUser.id,
                blocked_id: self.id,
            }
        })
        return !!existingBlock
    } catch {
        return false
    }
}