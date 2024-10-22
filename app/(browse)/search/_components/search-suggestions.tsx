import { LiveBadge } from '@/components/live-badge'
import { VerifiedMark } from '@/components/stream-layer/verified-mark'
import Image from 'next/image'
import Link from 'next/link'

interface Suggestion {
    id: string,
    title: string,
    is_live: boolean,
    user: {
        username: string,
        image_url: string
    }
}

interface SearchSuggestionsProps {
    suggestions: Suggestion[]
}

export const SearchSuggestions = ({ suggestions }: SearchSuggestionsProps) => {
    if (suggestions.length === 0) return null

    return (
        <div className="absolute z-50 w-full bg-[#252731] top-8 left-0 shadow-lg mt-2 rounded">
            <ul>
                {suggestions.map((suggestion) => (
                    <li key={suggestion.id} className="p-2 rounded hover:bg-neutral-700 cursor-pointer">
                        <Link href={`/${suggestion.user.username}`}>
                            <div className="flex justify-between items-center">
                                <div className='flex gap-2 items-center'>
                                    <Image
                                        src={suggestion?.user.image_url}
                                        alt='avatar'
                                        width={35}
                                        height={35}
                                        className='rounded-full'
                                    />
                                    <span className="text-sm text-white">{suggestion.user.username}</span>
                                    <VerifiedMark />
                                </div>
                                {suggestion.is_live ? (
                                    <LiveBadge />
                                ) : null}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
