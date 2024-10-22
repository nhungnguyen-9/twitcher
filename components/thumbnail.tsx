'use client'
import { UserAvatar } from "@/app/(browse)/_components/sidebar/user-avatar"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import React, { useState } from "react"

interface ThumbnailProps {
    src: string | null,
    fallback: string,
    isLive: boolean,
    username: string
}

const colors = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-orange-600",
]

export const Thumbnail = ({
    src,
    fallback,
    isLive,
    username
}: ThumbnailProps) => {
    const [hoverColor, setHoverColor] = useState<string | null>(null)

    const handleMouseEnter = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        setHoverColor(randomColor)
    }

    const handleMouseLeave = () => {
        setHoverColor(null)
    }

    let content

    if (!src) {
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md">
                <UserAvatar
                    size='lg'
                    showBadge
                    username={username}
                    imageUrl={fallback}
                    isLive={isLive}
                />
            </div>
        )
    }
    else {
        content = (
            <Image
                src={src}
                fill
                alt='Thumbnail'
                className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
            />
        )
    }

    return (
        <div
            className="group aspect-video relative rounded-md cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`rounded-md absolute inset-0 ${hoverColor} opacity-0 group-hover:opacity-100 transition-opacity flex items-center`}
            />
            {content}
        </div>
    )
}

export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-md cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    )
}
