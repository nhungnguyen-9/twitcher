import {db} from "@/lib/db";

export const getStreamByID = async (id: number) => {
    return db.stream.findFirst({
        where: {id: id}
    });
}
