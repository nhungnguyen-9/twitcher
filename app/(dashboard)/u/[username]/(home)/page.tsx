import { StreamLayer } from "@/components/stream-layer"
import { getUserByUserName } from "@/lib/user-service"
import { currentUser } from "@clerk/nextjs/server"

interface CreatorPageProps {
    params: {
        username: string
    }
}

const CreatorPage = async ({
    params
}: CreatorPageProps) => {
    const externalUser = await currentUser()

    const user = await getUserByUserName(params.username)

    // if (!user || user.external_user_id !== externalUser?.id || !user.streams) {
    //     throw new Error('Unauthorized')
    // }

    return (
        <div className="h-full">
            <StreamLayer
                user={user}
                streams={user.streams}
                isFollowing
            />
        </div>
    )
}

export default CreatorPage