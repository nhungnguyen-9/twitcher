'use server'

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { Social, User } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface UpdateUserInput {
    bio: string
    socials: {
        id?: string
        name: string
        link: string
    }[]
}

export const updateUser = async ({ bio, socials }: UpdateUserInput): Promise<User> => {
    try {
        const self = await getSelf()

        if (!self) {
            throw new Error('Unauthorized')
        }

        const user = await db.user.update({
            where: { id: self.id },
            data: {
                bio,
                socials: {
                    deleteMany: {
                        id: {
                            notIn: socials
                                .map(s => s.id ? BigInt(s.id) : undefined)
                                .filter((id): id is bigint => id !== undefined)
                        }
                    },
                    upsert: socials.map(social => ({
                        where: { id: social.id ? BigInt(social.id) : 0 },
                        create: {
                            name: social.name,
                            link: social.link
                        },
                        update: {
                            name: social.name,
                            link: social.link
                        }
                    }))
                }
            },
            include: { socials: true }
        })

        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return JSON.parse(JSON.stringify(user, (_, v) =>
            typeof v === 'bigint' ? v.toString() : v
        ))

    } catch (error) {
        console.error("Error updating user:", error)
        throw new Error('Internal Error')
    }
}