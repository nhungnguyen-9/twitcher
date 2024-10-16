"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf()
        const selfStream = await db.stream.findUnique({
            where: { user_id: 1 }
        })

        if (!selfStream) {
            throw new Error("Stream not found")
        }

        const validData:any = {
            title: values.title || selfStream.title,
            is_chat_enabled: values.is_chat_enabled || selfStream.is_chat_enabled,
            is_chat_followers_only: values.is_chat_followers_only || selfStream.is_chat_followers_only,
            is_chat_delayed: values.is_chat_delayed || selfStream.is_chat_delayed,
        }

        const stream = await db.stream.update({
            where: { id: 1 },
            data: { ...validData }
        })

        if (!stream) {
            throw new Error("Stream not found")
        }

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`${self.username}`)

        return stream
    } catch(err) {
        console.log(err)
        throw new Error("Internal Error")
    }
}