import { getSelf } from '@/lib/auth-service'
import { getStreamByUserID } from '@/lib/stream-service'
import React from 'react'
import { ToggleCard } from './__components/toggle-card'

const ChatPage = async () => {
    const self = await getSelf()
    const stream = await getStreamByUserID(Number(self.id))

    if (!stream) {
        throw new Error("Stream not found")
    }

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Chat settings</h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                    field="is_chat_enabled"
                    label="Enable chat"
                    value={stream.is_chat_enabled}
                />

                <ToggleCard
                    field="is_chat_delayed"
                    label="Delay chat"
                    value={stream.is_chat_delayed}
                />

                <ToggleCard
                    field="is_chat_followers_only"
                    label="Must be following to chat"
                    value={stream.is_chat_followers_only}
                />
            </div>
        </div>
    )
}

export default ChatPage