import React, { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface IWrapperCardProps {
    children: ReactNode
    shadowHidden?: boolean
}

// Flat at rest; a dragged tile lifts onto its own layer, the only shadow on the page.
export const WrapperCard: FC<IWrapperCardProps> = ({ children, shadowHidden = false }) => {
    return (
        <div className={cn(
            'h-full w-full transition-[box-shadow,background-color] duration-300 ease-out',
            !shadowHidden && 'bg-paper shadow-[0_28px_56px_-16px_rgb(17_20_24/0.28)]'
        )}>
            {children}
        </div>
    )
}
