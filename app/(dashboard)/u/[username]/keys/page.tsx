import { getSelf } from "@/lib/auth-service"
import { KeyCard } from "./_components/key-card"
import { OpenModal } from "./_components/open-modal"
import { UrlCard } from "./_components/url-card"
import { getStreamByUserID } from "@/lib/stream-service"

const KeyPage = async () => {
    const self = await getSelf()
    const stream = await getStreamByUserID(self.id.toString())

    if (!stream) {
        throw new Error('Stream not found')
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Keys and URL</h1>
                <OpenModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.server_url} />
                <KeyCard value={stream.stream_key} />
            </div>
        </div>
    )
}

export default KeyPage