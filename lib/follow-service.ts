import {db} from "./db"
import {getSelf} from "./auth-service"

const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
            },
            include: {
                following: true
            }
        })
        return followedUsers
    } catch {
        return []
    }
}

const existedFollower = async (id: number) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if (!otherUser) {
        throw new Error("User not found")
    }
    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself")
    }

    return await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        }
    })
}

export const isFollowingUser = async (id: number) => {
    try {
        const existingFollow = await existedFollower(id)
        return !!existingFollow
    } catch {
        return false
    }

}

export const followUser = async (id: number) => {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if (!otherUser) {
        throw new Error("User not found")
    }
    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        }
    })

    if (existingFollow) {
        throw new Error("Already following")
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true
        }
    })
    return follow
}

export const unfollowUser = async (id: number) => {
    const existingFollow = await existedFollower(id)
    if (!existingFollow) {
        throw new Error("Not following")
    }
    const unfollow = await db.follow.delete(
        {
            where: {
                id: existingFollow.id
            },
            include: {
                following: true,
            }
        }
    )

    return unfollow
}


