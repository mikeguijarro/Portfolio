'use client'

import Link from "next/link"
import { HTMLAttributeAnchorTarget, ReactNode, useRef } from "react"

// Prop names differ from the caption's href/target, which withTitle consumes.
interface IPanelLinkProps {
    panelHref: string
    panelTarget?: HTMLAttributeAnchorTarget
    children: ReactNode
}

// A press that travels further than this is a grid drag, not a click. Shared with ImageCard.
export const DRAG_THRESHOLD_PX = 6

// Makes a whole tile panel clickable inside the draggable grid. The click that ends a drag
// is ignored, and the caption title stays the accessible link, so this one is skipped by
// keyboard and screen readers.
export function PanelLink({ panelHref, panelTarget, children }: IPanelLinkProps) {
    const refPointerStart = useRef<{ x: number, y: number } | null>(null)

    return (
        <Link
            href={panelHref}
            target={panelTarget}
            rel={panelTarget === '_blank' ? 'noopener noreferrer' : undefined}
            tabIndex={-1}
            aria-hidden="true"
            // Links are natively draggable. A native link drag swallows the mouse events the grid
            // needs to finish its own drag, leaving the tile stuck and the page frozen.
            draggable={false}
            onDragStart={(e) => { e.preventDefault() }}
            onPointerDown={(e) => { refPointerStart.current = { x: e.clientX, y: e.clientY } }}
            onClick={(e) => {
                const start = refPointerStart.current
                if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_THRESHOLD_PX) {
                    e.preventDefault()
                }
            }}
            className="group/panel block h-full w-full cursor-pointer">
            {children}
        </Link>
    )
}
