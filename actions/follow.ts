"use server";
import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: number) => {
    try {
        const followedUser = await followUser(id);
        revalidatePath("/")
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`)
        }
        return followedUser
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}

export const onUnfollow = async (id: number) => {
    try {
        const unfollowedUser = await unfollowUser(id)
        revalidatePath("/")
        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`)
        }
    }catch (error) {
        throw new Error("Internal Server Error")
    }
}