'use client'

import { useChatSidebar } from "@/store/use-chat-sidebar"
import { ChatToggle } from "./chat-toggle"
import { LiveKitRoom } from '@livekit/components-react'
import { cn } from "@/lib/utils"
import { Video, VideoSkeleton } from "./video"
import { Header, HeaderSkeleton } from "./header"
import { useViewerToken } from "@/hooks/use-viewer-token"
import { InfoCard } from "./info-card"
import { AboutCard } from "./about-card"
import { Chat, ChatSkeleton } from "./chat"
import { useEffect, useState } from "react"
import { Social } from "@prisma/client"
import { getSocials } from "@/actions/social"

type CustomStream = {
    id: bigint,
    is_chat_enabled: boolean,
    is_chat_delayed: boolean,
    is_chat_followers_only: boolean,
    is_live: boolean,
    thumbnail_url: string | null,
    title: string,
    category?: {
        id: bigint;
        title: string;
    } | null
}

type CustomUser = {
    id: bigint,
    username: string,
    bio: string | null,
    email: string,
    image_url: string,
    _count: { following: number },
    streams: CustomStream | null,
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
    const {
        token,
        name,
        identity
    } = useViewerToken(user.id.toString())

    const { collapsed } = useChatSidebar((state) => state)

    const [socials, setSocials] = useState<Array<{
        id: string,
        name: string,
        link: string,
    }>>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getSocials(user.id.toString())
                const formattedSocials = userData.map((social) => ({
                    id: social.id.toString(),
                    user_id: social.user_id.toString(),
                    name: social.name,
                    link: social.link,
                }));
                setSocials(formattedSocials);
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        fetchData()
    }, [user.id])

    if (!token || !name || !identity) {
        return (
            <StreamPlayerSkeleton />
        )
    }

    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={token}
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
                    <Header
                        hostName={user.username}
                        hostIdentity={user.id.toString()}
                        viewerIdentity={identity}
                        imageUrl={user.image_url}
                        isFollowing={isFollowing}
                        title={streams.title}
                    />
                    <InfoCard
                        hostIdentity={user.id.toString()}
                        viewerIdentity={identity}
                        streamId={streams.id.toString()}
                        name={streams.title}
                        thumbnailUrl={streams.thumbnail_url}
                    />
                    <AboutCard
                        hostName={user.username}
                        hostIdentity={user.id.toString()}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount={user._count.following}
                        socials={socials}
                        onUpdateSocials={(newSocials: Array<{
                            id: string,
                            name: string,
                            link: string,
                        }>) => setSocials(newSocials)}
                    />
                </div>
                <div
                    className={cn(
                        'col-span-1',
                        collapsed && 'hidden'
                    )}
                >
                    <Chat
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id.toString()}
                        isFollowing={isFollowing}
                        streamId={streams.id.toString()}
                        isChatEnabled={streams.is_chat_enabled}
                        isChatDelayed={streams.is_chat_delayed}
                        isChatFollowersOnly={streams.is_chat_followers_only}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
}