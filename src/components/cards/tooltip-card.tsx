'use client'

import React, { FC, ReactNode, useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { createPortal } from 'react-dom'

interface ITooltipCardProps {
    children: ReactNode
}

export const TooltipCard: FC<ITooltipCardProps> = ({ children }) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const element = document.getElementById("tooltip-portal")
        setPortalElement(element)
    }, [])

    return (
        <TooltipProvider>
            <Tooltip delayDuration={1600}>
                {/* Radix skips its own handler when ours calls preventDefault:
                    - focus: keyboard users can't drag, and a tooltip opened by focus inside the
                      lightbox swallowed the first Esc (Radix cancels Escape while it's open).
                    - pointer over a button or link: don't compete with the expand/link controls. */}
                <TooltipTrigger
                    asChild
                    onFocus={(e) => { e.preventDefault() }}
                    onPointerMove={(e) => {
                        if ((e.target as HTMLElement).closest('button, a')) {
                            e.preventDefault()
                        }
                    }}>
                    <div className="h-full w-full">
                        {children}
                    </div>
                </TooltipTrigger>
                {portalElement && createPortal((
                    <TooltipContent>
                        Drag to rearrange
                    </TooltipContent>
                ), portalElement)
                }
            </Tooltip >
        </TooltipProvider>
    )
}
