'use server'

import { getMessages, saveMessages } from "@/lib/comment-service"

export const saveChatComment = async (content: string, commenter: string, userId: string, streamId: string) => {
    return saveMessages(content, commenter, userId, streamId);
}

export const getAllComments = async (streamId: string) => {
    return getMessages(streamId);
}