"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { fetchCategoryByStreamId } from "@/lib/stream-service"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

type StreamUpdateValues = Omit<Partial<Stream>, 'category_id'> & {
    category_id?: bigint | null;
}

export const updateStreamWithCategory = async (values: StreamUpdateValues, category_id?: string | null) => {
    try {
        const self = await getSelf()
        const selfStream = await db.stream.findUnique({
            where: { user_id: self.id }
        })

        if (!selfStream) {
            throw new Error("Stream not found")
        }

        const validData = {
            title: values.title,
            is_chat_enabled: values.is_chat_enabled,
            is_chat_followers_only: values.is_chat_followers_only,
            is_chat_delayed: values.is_chat_delayed,
            category_id: category_id ? BigInt(category_id) : null,
            thumbnail_url: values.thumbnail_url
        }

        const stream = await db.stream.update({
            where: { id: selfStream.id },
            data: { ...validData }
        })

        if (!stream) {
            throw new Error("Stream not found")
        }

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`${self.username}`)

        return {
            ...stream,
            category_id: stream.category_id ? stream.category_id.toString() : null
        };
    } catch (err) {
        console.log(err)
        throw new Error("Internal Error")
    }
}


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
            title: values.title,
            is_chat_enabled: values.is_chat_enabled,
            is_chat_followers_only: values.is_chat_followers_only,
            is_chat_delayed: values.is_chat_delayed,
            // category_id: values.category_id ? BigInt(values.category_id) : null,
            thumbnail_url: values.thumbnail_url
        }

        const stream = await db.stream.update({
            where: { id: selfStream.id },
            data: { ...validData }
        })

        if (!stream) {
            throw new Error("Stream not found")
        }

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`${self.username}`)

        return stream
    } catch (err) {
        console.log(err)
        throw new Error("Internal Error")
    }
}

export const fetchCategory = async (stream_id: string) => {
    try {
        const category = await fetchCategoryByStreamId(stream_id)
        return category
    } catch (error) {
        console.error("Failed to fetch category for stream:", error)
        return null
    }
}