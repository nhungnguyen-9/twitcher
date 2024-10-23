import { getBlockedUsers } from "@/lib/block-service"
import { format } from "date-fns"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

const CommunityPage = async () => {
    const blockedUsers = await getBlockedUsers()

    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id.toString(),
        imageUrl: block.blocked.image_url,
        username: block.blocked.username,
        createdAt: format(new Date(block.blocked.created_at), 'dd/MM/yyy')
    }))

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Community Settings
                </h1>
                <DataTable columns={columns} data={formattedData} />
            </div>
        </div>
    )
}

export default CommunityPage