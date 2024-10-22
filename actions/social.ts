'use server'
import { revalidatePath } from 'next/cache';
import { getSocialFromUserID } from './../lib/social-service';
import { getSelf } from '@/lib/auth-service';

export const getSocials = async (user_id: string) => {
    const self = await getSelf()
    try {
        const allSocials = await getSocialFromUserID(user_id)
        revalidatePath(`/u/${self.username}`)

        return allSocials
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}