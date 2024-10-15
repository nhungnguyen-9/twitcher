import {db} from "@/lib/db";

export const getStreamByUserID = async (userID: number) => {
    return db.stream.findFirst({
        where: {id: userID}
    });
}

