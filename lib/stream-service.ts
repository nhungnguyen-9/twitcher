import { db } from "@/lib/db";

export const getStreamByUserID = async (userID: string) => {
    return db.stream.findFirst({
        where: { user_id: Number(userID) }
    });
}

