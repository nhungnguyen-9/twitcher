import {db} from "@/lib/db";

export const getStreamByUserID = async (userID: bigint) => {
    return db.stream.findFirst({
        where: {id: userID}
    });
}

