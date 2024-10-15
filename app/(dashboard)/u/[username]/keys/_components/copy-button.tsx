'use client'

import { Button } from "@/components/ui/button"
import { CheckCheck, Copy } from "lucide-react"
import { useState } from "react"

interface CopyButtonProps {
    value?: string | null
}

export const CopyButton = ({
    value
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const onClick = () => {
        if (!value) return

        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }

    const Icon = isCopied ? CheckCheck : Copy

    return (
        <Button
            onClick={onClick}
            disabled={!value || isCopied}
            variant='ghost'
            size='sm'
        >
            <Icon />
        </Button>
    )
}
