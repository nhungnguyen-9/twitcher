'use client'

import { useChatSidebar } from "@/store/use-chat-sidebar"
import { ChatToggle } from "./chat-toggle"
import { LiveKitRoom } from '@livekit/components-react'
import { cn } from "@/lib/utils"
import { Video } from "./video"


type CustomStream = {
    id: bigint,
    is_chat_enabled: boolean,
    is_chat_delayed: boolean,
    is_chat_followers_only: boolean,
    is_live: boolean,
    thumbnail_url: string | null,
    title: string
}

type CustomUser = {
    id: bigint,
    username: string,
    bio: string | null,
    email: string,
    image_url: string,
    _count: { following: number },
    streams: CustomStream | null
}

interface StreamLayerProps {
    user: CustomUser & { streams: CustomStream | null, _count: { following: number } },
    streams: CustomStream,
    isFollowing: boolean
}

export const StreamLayer = ({
    user,
    streams,
    isFollowing
}: StreamLayerProps) => {
    // use viewer token

    const { collapsed } = useChatSidebar((state) => state)

    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={"token"}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn("grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
                )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video
                        hostName={user.username}
                        hostIdentity={user.id.toString()}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}
