import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface HintProps {
    label: string,
    side?: 'top' | 'right' | 'left' | 'bottom',
    align?: 'start' | 'center' | 'end',
    children: React.ReactNode,
    asChild?: boolean
}

export const Hint = ({
    label,
    side,
    align,
    children,
    asChild
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0} >
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className='bg-white text-black'
                    side={side}
                    align={align}
                >
                    <p className='font-semibold'>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
