'use client'

interface AboutCardProps {
    hostName: string,
    hostIdentity: string,
    viewerIdentity: string,
    bio: string | null,
    followedByCount: number
}

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount
}: AboutCardProps) => {
    return (
        <div>AboutCard</div>
    )
}
