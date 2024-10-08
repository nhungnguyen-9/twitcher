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

    if (!user || user.externalUserId !== externalUser?.id) {
        throw new Error('Unauthorized')
    }

    return (
        <div>
            creator
        </div>
    )
}

export default CreatorPage