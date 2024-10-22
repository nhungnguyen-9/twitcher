'use client'

import { Facebook, Instagram, Twitter, Youtube, Link as LinkIcon } from "lucide-react"
import { BioModal } from "./bio-modal"
import { VerifiedMark } from "./verified-mark"

interface Social {
    id: string,
    name: string,
    link: string
}

interface AboutCardProps {
    hostName: string,
    hostIdentity: string,
    viewerIdentity: string,
    bio: string | null,
    followedByCount: number,
    socials: Social[],
    onUpdateSocials: (newSocials: Social[]) => void,
}

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount,
    socials,
    onUpdateSocials
}: AboutCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`
    const isHost = viewerIdentity === hostAsViewer

    const followedByLabel = followedByCount === 1 ? 'follower' : 'followers'

    const getSocialIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'facebook':
                return <Facebook className="h-4 w-4" />
            case 'youtube':
                return <Youtube className="h-4 w-4" />
            case 'twitter':
                return <Twitter className="h-4 w-4" />
            case 'instagram':
                return <Instagram className="h-4 w-4" />
            default:
                return <LinkIcon className="h-4 w-4" />
        }
    }

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }

    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && (
                        <BioModal
                            initialValue={bio}
                            socials={socials}
                            onUpdateSocials={onUpdateSocials} />
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm text-muted-foreground">
                            <span className="font-semibold text-primary">
                                {followedByCount}
                            </span> {followedByLabel}
                        </div>
                        <p className="text-sm">
                            {bio || 'This user prefers to keep an air of mystery about them'}
                        </p>
                    </div>
                    {socials && socials.length > 0 && (
                        <div className="">
                            <ul className="">
                                {socials.map((social) => (
                                    <li key={social.id} className="mt-2 hover:underline">
                                        <a
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-x-2 text-white hover:text-primary transition"
                                        >
                                            {getSocialIcon(social.name)}
                                            <span>{capitalizeFirstLetter(social.name)}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}