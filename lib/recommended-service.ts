import { db } from "./db";
import { getSelf } from "./auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null
    }
    let users: User[] = []

    if (userId) {
        const users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        }
                    },
                    {
                        NOT: {
                            followers: {
                                some: {
                                    follower_id: userId
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                streams: {  
                    select: {
                        is_live: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc',
            }
        });
    } else {
        users = await db.user.findMany({
            orderBy: {
                created_at: "desc"
            }
        })
    }

    return users
}