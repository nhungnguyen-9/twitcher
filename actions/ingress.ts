"use server";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
    CreateIngressOptions,
    EncodingOptions,
    IngressAudioEncodingPreset,
    IngressClient,
    IngressInput,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    TrackSource,
} from "livekit-server-sdk"
import { revalidatePath } from "next/cache";


const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!,
)


const ingressClient = new IngressClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!,
)

export const resetIngresses = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity,
    })

    const rooms = await roomService.listRooms([hostIdentity])

    for (const room of rooms) {
        await roomService.deleteRoom(room.name)
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}

export const createIngress = async (ingressType: IngressInput) => {
    const self = await getSelf();

    await resetIngresses(self.id.toString())

    const options: CreateIngressOptions = {
        name: self.username,
        roomName: self.id.toString(),
        participantName: self.username,
        participantIdentity: self.id.toString(),
    }

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.enableTranscoding = true
    } else {
        options.video = {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        };
        options.audio = {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        }
    }

    // Get ingress from ingressClient
    const ingress = await ingressClient.createIngress(ingressType, options)

    // Ensure that ingress data is serializable
    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error('Failed to create ingress');
    }

    // Sanitize and extract only necessary fields
    const sanitizedIngress = {
        ingressId: ingress.ingressId,
        url: ingress.url,
        streamKey: ingress.streamKey
    }

    // Update the stream record in the database
    await db.stream.update({
        where: {
            id: 1
        },
        data: {
            ingress_id: sanitizedIngress.ingressId,
            server_url: sanitizedIngress.url,
            stream_key: sanitizedIngress.streamKey,
        }
    });

    // Revalidate paths
    revalidatePath(`/u/${self.username}/keys`);

    // Return only the sanitized ingress data to avoid Client/Server serialization issues
    return sanitizedIngress;
}
