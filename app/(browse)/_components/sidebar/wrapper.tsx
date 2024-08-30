'use client'

import { cn } from "@/lib/utils";
import { userSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper = ({
    children
}: WrapperProps) => {
    const [isClient, setIsClient] = useState(false)
    const { collapsed } = userSidebar((state) => state)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] bg-[#2D2E35] text-white">
                <ToggleSkeleton />
                {/* <RecommendedSkeleton /> */}
            </aside>
        )
    }

    return (
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] bg-[#2D2E35] text-white",
            collapsed && 'w-[70px]'
        )}>
            {children}
        </aside>
    );
}

export default Wrapper;