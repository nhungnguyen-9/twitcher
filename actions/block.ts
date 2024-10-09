"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/follow-service";
import {blockUser, unblockUser} from "@/lib/block-service";

export const onBlock = async (id: number) => {
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

export const onUnblock = async (id: number) => {
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