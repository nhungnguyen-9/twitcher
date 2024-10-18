'use client'

import { Pencil } from "lucide-react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { InfoModal } from "./info-modal"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { fetchCategories } from "@/actions/category"
import { fetchCategory } from "@/actions/stream"

interface InfoCardProps {
    hostIdentity: string,
    viewerIdentity: string,
    name: string,
    thumbnailUrl: string | null,
    streamId: string
}

export const InfoCard = ({
    hostIdentity,
    viewerIdentity,
    name,
    thumbnailUrl,
    streamId
}: InfoCardProps) => {
    const [categories, setCategories] = useState<{ id: string, title: string }[]>([])
    const [category, setCategory] = useState<string | null>(null)

    const hostAsViewer = `host-${hostIdentity}`
    const isHost = viewerIdentity === hostAsViewer

    useEffect(() => {
        if (isHost) {
            const loadCategory = async () => {
                try {
                    const fetchedCategory = await fetchCategory(streamId)
                    setCategory(fetchedCategory?.title || "No category")
                } catch (error) {
                    console.error("Failed to fetch category for stream:", error)
                    setCategory("Error fetching category")
                }
            }

            loadCategory()
        }
    }, [isHost, streamId])

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories()
                setCategories(fetchedCategories)
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            }
        }

        if (isHost) {
            loadCategories()
        }
    }, [isHost])

    const handleCategoryUpdate = (newCategory: string) => {
        setCategory(newCategory)
    }

    if (!isHost) return null

    return (
        <div className="px-4">
            <div className="rounded-xl bg-background">
                <div className="flex items-center gap-x-2.5 p-4">
                    <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
                        <Pencil className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-sm lg:text-lg font-semibold capitalize">
                            Edit your stream info
                        </h2>
                        <p className="text-muted-foreground text-xs lg:text-sm">
                            Maximize your visibility
                        </p>
                    </div>
                    <InfoModal
                        initialName={name}
                        initialThumbnail={thumbnailUrl}
                        categories={categories}
                        onCategoryUpdate={handleCategoryUpdate}
                    />
                </div>
                <Separator />
                <div className="p-4 lg:p-6 space-y-4">
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Title
                        </h3>
                        <p className="text-sm font-semibold">
                            {name}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Categories
                        </h3>
                        <p className="text-sm font-semibold">
                            {category}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Thumbnail
                        </h3>
                        {thumbnailUrl && (
                            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                                <Image
                                    fill
                                    src={thumbnailUrl}
                                    alt={name}
                                    className="object-cover"
                                />
                            </div>
                        )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
