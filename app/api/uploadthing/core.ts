import { getSelf } from "@/lib/auth-service";
import { convertBigIntToString } from "@/lib/convert-bigint-to-string";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const self = await getSelf()

            return { user: convertBigIntToString(self) }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const userId = BigInt(metadata.user.id)
            await db.stream.update({
                where: {
                    user_id: userId
                },
                data: {
                    thumbnail_url: file.url
                }
            })

            return { fileUrl: file.url }
        })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;