'use client'

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"

interface KeyCardProps {
    value: string | null
}

export const KeyCard = ({
    value
}: KeyCardProps) => {
    const [show, setShow] = useState(false)

    const onClick = () => {
        setShow(!show)
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">Stream key</p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input
                            value={value || ''}
                            type={show ? 'text' : 'password'}
                            disabled
                            placeholder="Your stream key"
                        />
                        <CopyButton value={value || ''} />
                    </div>
                    <Button
                        size='sm'
                        variant='link'
                        onClick={onClick}
                    >
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
