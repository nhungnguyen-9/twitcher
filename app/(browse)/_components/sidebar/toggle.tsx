'use client'
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { userSidebar } from "@/store/use-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

export const Toggle = () => {
    const {
        collapsed,
        onCollapsed,
        onExpand
    } = userSidebar((state) => state)

    const label = collapsed ? 'Expand' : 'Collapse'

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint
                        label={label}
                        side='right'
                        align="center"
                        asChild
                    >
                        <Button
                            variant='ghost'
                            className="h-auto p-1"
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine className="w-4 h-4" />
                        </Button>
                    </Hint>
                </div>
            )}

            {!collapsed && (
                <div className="p-3 mb-2 flex items-center w-full">
                    <p className="font-semibold text-xl">
                        For You
                    </p>
                    <Hint
                        label={label}
                        side="right"
                        align="center"
                        asChild
                    >
                        <Button
                            variant='ghost'
                            className="h-auto p-2 ml-auto"
                            onClick={onCollapsed}
                        >
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-6" />
        </div>
    )
}