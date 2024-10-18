'use client'

import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessage } from "./chat-message"
import { Skeleton } from "../ui/skeleton"
import { useEffect, useRef, useState } from "react"
import { getAllComments } from "@/actions/comment"

interface ChatListProps {
    messages: ReceivedChatMessage[],
    isHidden: boolean,
    streamId: string,
}

export const ChatList = ({
    messages,
    isHidden,
    streamId,
}: ChatListProps) => {
    const [storedMessages, setStoredMessages] = useState<ReceivedChatMessage[]>([])
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchStoredMessages = async () => {
            try {
                const savedMessages = await getAllComments(streamId)
                const formattedMessages = savedMessages.map((msg: any) => ({
                    ...msg,
                    message: msg.content,
                    timestamp: new Date(msg.created_at).getTime(),
                    from: { name: msg.commenter },
                    sender: msg.commenter,
                }))
                setStoredMessages(formattedMessages)
            } catch (error) {
                console.error("Failed to load stored messages", error)
            }
        }
        fetchStoredMessages()
    }, [streamId])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages, storedMessages])

    const combinedMessages = [...storedMessages, ...messages].sort((a, b) => b.timestamp - a.timestamp)

    if (isHidden || (combinedMessages.length === 0)) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
                </p>
            </div>
        )
    }

    return (
        <div ref={chatContainerRef} className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {combinedMessages.map((message, index) => (
                <ChatMessage
                    key={message.timestamp + index}
                    data={message}
                />
            ))}
        </div>
    )
}

export const ChatListSkeleton = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1/2 h-6" />
        </div>
    )
}
