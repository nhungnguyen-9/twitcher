import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800']
})

export const Logo = () => {
    return (
        <div className='flex flex-col items-center gap-y-4'>
            <div className='bg-white rounded-full p-1'>
                <Image
                    src="./logo-name.svg"
                    alt='twitcher'
                    width='80'
                    height='80'
                />
            </div>
            <div className='flex flex-col items-center'>
                <p
                    className={cn(
                        'text-sm text-muted-foreground',
                        font.className
                    )}
                >
                    Let&apos;s stream
                </p>
            </div>
        </div>
    )
}
