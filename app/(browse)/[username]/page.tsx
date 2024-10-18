import { isBlockedByUser } from "@/actions/block";
import { StreamLayer } from "@/components/stream-layer";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import UserLoading from "./loading";


interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserName(params.username)

    if (!user || !user.streams) {
        notFound()
    }

    const isFollowing = await isFollowingUser(String(user.id))
    const isBlocked = await isBlockedByUser(String(user.id))

    if (isBlocked) {
        notFound();
    }

    return (
        <Suspense fallback={<UserLoading />}>
            <div className="h-full">
                <StreamLayer
                    user={user}
                    streams={user.streams}
                    isFollowing={isFollowing}
                />
            </div>
        </Suspense>
    )
}

export default UserPage