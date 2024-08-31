'use client'

import { cn } from "@/lib/utils"
import { userSidebar } from "@/store/use-sidebar"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({
    children
}: ContainerProps) => {
    const matches = useMediaQuery('(max-width:1024px)')

    const {
        collapsed,
        onExpand,
        onCollapsed
    } = userSidebar((state) => state)

    useEffect(() => {
        if (matches) {
            onCollapsed()
        } else {
            onExpand()
        }
    }, [matches, onCollapsed, onExpand])

    return (
        <div
            className={
                cn(
                    'flex-1',
                    collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
                )
            }
        >
            {children}
        </div>
    )
}

export default Container