import { db } from "./db"

export const getSocialFromUserID = async (user_id: string) => {
    const socials = await db.social.findMany({
        where: {
            user_id: BigInt(user_id)
        },
    })

    return socials
}