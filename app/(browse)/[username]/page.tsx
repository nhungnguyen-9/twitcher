import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserName(params.username)

    if (!user) {
        notFound()
    }

    const isFollowing = await isFollowingUser(Number(user.id))

    return (
        <div className="flex flex-col gap-y-4">
            <p>username: {user.username}</p>
            <p>userID: {user.id.toString()}</p>
            <p>isFollowing: {`${isFollowing}`}</p>
            <Actions isFollowing={isFollowing} userId={Number(user.id)} />
        </div>
    )
}

export default UserPage