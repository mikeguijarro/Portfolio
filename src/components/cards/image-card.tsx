'use client'

import Image from "next/image"
import { FC, useRef, useState } from "react"
import { Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Lightbox } from "./lightbox"
import { DRAG_THRESHOLD_PX } from "./panel-link"

export interface IImageCardProps {
    src: string
    alt: string
    isScaleHover?: boolean
    // Shown in the full-size view. Named apart from title/meta, which withTitle consumes.
    lightboxCaption: string
    lightboxMeta?: string
}

export const ImageCard: FC<IImageCardProps> = ({ src, alt, isScaleHover = false, lightboxCaption, lightboxMeta }) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const refPointerStart = useRef<{ x: number, y: number } | null>(null)

    return (
        <div className="relative h-full w-full">
            {isLoaded ? null : <div aria-hidden="true" className="absolute inset-0 bg-rule/30" />}
            <Image
                onLoad={(e) => {
                    setIsLoaded(true)
                    // The lightbox reuses this exact file, so it opens instantly from cache.
                    setLoadedSrc(e.currentTarget.currentSrc)
                }}
                src={src}
                alt={alt}
                draggable={false}
                fill
                // 90 keeps small text in screenshots (the Amazon shout-out) legible.
                quality={90}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                className={cn(
                    "object-cover transition-transform duration-700 ease-out-expo",
                    isScaleHover && "group-hover/tile:scale-[1.03]"
                )}
            />
            {/* Clicking the image opens it full size; a press that travels is a grid drag and is ignored.
                Hidden from assistive tech: the button below is the accessible way in. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 cursor-zoom-in"
                onPointerDown={(e) => { refPointerStart.current = { x: e.clientX, y: e.clientY } }}
                onClick={(e) => {
                    const start = refPointerStart.current
                    if (start === null || Math.hypot(e.clientX - start.x, e.clientY - start.y) <= DRAG_THRESHOLD_PX) {
                        setIsExpanded(true)
                    }
                }} />
            {/* Same control and placement as the video's fullscreen button; 44px on touch screens. */}
            <button
                type="button"
                aria-label={`View full size: ${lightboxCaption}`}
                aria-haspopup="dialog"
                className='absolute bottom-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule bg-surface text-ink transition-[opacity,border-color] duration-200 hover:border-ink focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/tile:opacity-100 [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11'
                onMouseDown={(e) => { e.stopPropagation() }}
                onTouchStart={(e) => { e.stopPropagation() }}
                onClick={() => setIsExpanded(true)}>
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </button>
            {isExpanded ? (
                <Lightbox
                    src={loadedSrc ?? src}
                    alt={alt}
                    caption={lightboxCaption}
                    meta={lightboxMeta}
                    onClose={() => setIsExpanded(false)} />
            ) : null}
        </div>
    )
}
