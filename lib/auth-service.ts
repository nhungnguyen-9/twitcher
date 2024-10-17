import { db } from "./db";
import { currentUser } from "@clerk/nextjs/server";

export const getSelf = async () => {
    // const self = await currentUser();
    const self = await db.user.findUnique({
        where: {id: 1}
    })

    if (!self || !self.username) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: { external_user_id: String(self.id) }
    })
    if (!user) {
        throw new Error("Not found")
    }

    return user
}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser()
    if (!self || !self.username) {
        return
        throw new Error('Unauthorized')
    }

    const user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return
        throw new Error('User not found')
    }

    if (self.username !== user.username) {
        return
        throw new Error('Unauthorized')
    }

    return user
}