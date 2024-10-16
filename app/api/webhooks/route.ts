import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOKS_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOKS_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    const eventType = evt.type;

    if (eventType === 'user.created') {
        await db.user.create({
            data: {
                external_user_id: payload.data.id,
                username: payload.data.username,
                image_url: payload.data.image_url,
                email: payload.data.email_addresses[0].email_address,
                role_id: 2,
                streams: {
                    create: {
                        title: `${payload.data.username}'s stream`
                    }
                }
            }
        })
    }

    if (eventType === 'user.updated') {
        const currentUser = await db.user.findUnique({
            where: {
                external_user_id: payload.data.id,
            }
        })
        if (!currentUser) {
            return new Response('User not found', { status: 404 })
        }

        await db.user.update({
            where: {
                external_user_id: payload.data.id
            },
            data: {
                username: payload.data.username,
                image_url: payload.data.image_url
            }
        })
    }

    if (eventType === 'user.deleted') {
        await db.user.delete({
            where: {
                external_user_id: payload.data.id,
            }
        })
    }

    return new Response('', { status: 200 })
}