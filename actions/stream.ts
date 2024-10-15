"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf()
        const selfStream = await db.stream.findUnique({
            where: { user_id: self.id }
        })

        if (!selfStream) {
            throw new Error("Stream not found")
        }

        const validData = {
            name: values.title,
            isChatEnabled: values.is_chat_enabled,
            isChatFollowersOnly: values.is_chat_followers_only,
            // isChatDelayed: values.isChatDelayed
        }

        // Filter out undefined values
        const filteredData = Object.fromEntries(
            Object.entries(validData).filter(([_, v]) => v !== undefined)
        );

        const stream = await db.stream.update({
            where: { id: selfStream.id },
            data: { ...filteredData }
        })

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`${self.username}`)

        return stream
    } catch {
        throw new Error("Internal Error")
    }
}