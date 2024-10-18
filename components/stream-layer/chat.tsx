'use client'

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { ConnectionState } from "livekit-client"
import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { ChatHeader } from "./chat-header"
import { ChatList } from "./chat-list"
import { ChatForm } from "./chat-form"
import { ChatCommunity } from "./chat-community"
import { saveChatComment } from "@/actions/comment"

interface ChatProps {
    hostName: string,
    hostIdentity: string,
    viewerName: string,
    isFollowing: boolean,
    streamId: string,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    streamId,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}: ChatProps) => {
    const matches = useMediaQuery('(max-width: 1024px)')
    const {
        variant,
        onExpand
    } = useChatSidebar((state) => state)
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)

    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden = !isChatEnabled || !isOnline

    const [value, setValue] = useState('')
    const { chatMessages: messages, send } = useChat()

    useEffect(() => {
        if (matches) {
            onExpand()
        }
    }, [matches, onExpand])

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp)
    }, [messages])

    const onSubmit = async () => {
        if (!send) return

        try {
            // save message to db
            await saveChatComment(value, viewerName, hostIdentity, streamId)

            send(value)
            setValue('')
        } catch (error) {
            console.error("Failed to send message", error)
        }
    }

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList
                        streamId={streamId}
                        messages={reversedMessages}
                        isHidden={isHidden}
                    />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <ChatCommunity
                        viewerName={viewerName}
                        hostName={hostName}
                        isHidden={isHidden}
                    />
                </>
            )}
        </div>
    )
}
