'use client'

import { FocusEvent, MouseEvent, TouchEvent, useEffect, useId, useRef, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ILightboxProps {
    // The URL the tile already loaded, so the image comes from cache and appears with the fade.
    src: string
    alt: string
    caption: string
    meta?: string
    onClose: () => void
}

// Matches the .lightbox fade-out in globals.css; the dialog stays mounted while it plays.
const CLOSE_FADE_MS = 160

// Counted so that if two lightboxes overlap for a moment, the first locks scrolling and the last unlocks it.
let scrollLocks = 0

// Presses and focus changes inside the lightbox stay out of the grid tile it lives in: a press would
// start a grid drag, and focus would open the tile's "Drag to rearrange" tooltip.
const stopAtDialog = (e: MouseEvent | TouchEvent | FocusEvent) => { e.stopPropagation() }

// Full-page image view. A modal <dialog> renders in the browser's top layer, so it covers the page
// even from inside a transformed grid tile, and it brings Esc-to-close, an inert page behind it and
// focus return to the trigger. Any click closes it.
export function Lightbox({ src, alt, caption, meta, onClose }: ILightboxProps) {
    const refDialog = useRef<HTMLDialogElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const captionId = useId()

    useEffect(() => {
        const dialog = refDialog.current
        if (dialog === null) {
            return
        }
        if (!dialog.open) {
            dialog.showModal()
        }
        // A modal dialog doesn't stop the page behind it from scrolling.
        scrollLocks += 1
        if (scrollLocks === 1) {
            document.documentElement.style.overflow = 'hidden'
        }
        // Cleanup must not call dialog.close(): its close event would run onClose, and React's
        // development double-run of effects would then unmount the lightbox the moment it opens.
        // Unmounting removes the dialog from the top layer anyway.
        return () => {
            scrollLocks -= 1
            if (scrollLocks === 0) {
                document.documentElement.style.overflow = ''
            }
        }
    }, [])

    const handleClose = () => { refDialog.current?.close() }

    const handleDialogClose = () => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.setTimeout(onClose, isReducedMotion ? 0 : CLOSE_FADE_MS)
    }

    return (
        <dialog
            ref={refDialog}
            aria-labelledby={captionId}
            onClose={handleDialogClose}
            onClick={handleClose}
            onMouseDown={stopAtDialog}
            onTouchStart={stopAtDialog}
            onFocus={stopAtDialog}
            onBlur={stopAtDialog}
            className="lightbox fixed inset-0 m-0 h-full max-h-none w-full max-w-none cursor-zoom-out overflow-hidden border-0 bg-paper p-0 text-ink backdrop:bg-transparent">
            {/* Above the image layer so Close gets hover and its own clicks. */}
            <div className="relative z-10 flex items-start justify-between gap-6 px-4 py-4 md:px-12 md:py-6">
                <div id={captionId} className="min-w-0">
                    <p className="line-clamp-2 text-ui font-medium leading-[1.35] text-ink">{caption}</p>
                    {meta ? (
                        <p className="truncate font-mono text-meta text-muted">{meta}</p>
                    ) : null}
                </div>
                <button
                    type="button"
                    autoFocus
                    onClick={handleClose}
                    className="-mr-2 -mt-2.5 inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-2 text-ui text-muted transition-colors duration-200 hover:text-ink md:-mt-1.5 md:h-9">
                    Close
                    <X aria-hidden="true" className="h-4 w-4" />
                </button>
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-4 pb-6 pt-24 md:px-12 md:pb-12 md:pt-28">
                {/* A plain <img> on purpose: it reuses the exact file the tile loaded (instant, from cache)
                    and renders at its own pixel size, so max-w/max-h only ever shrink it, never upscale. The
                    outline is the tiles' hairline; ![filter:none] opts out of the dark-mode tile dimming. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={(img) => { if (img?.complete) setIsLoaded(true) }}
                    src={src}
                    alt={alt}
                    draggable={false}
                    onLoad={() => setIsLoaded(true)}
                    className={cn(
                        "h-auto max-h-full w-auto max-w-full outline outline-1 -outline-offset-1 outline-rule transition-opacity duration-300 ease-out ![filter:none]",
                        isLoaded ? "opacity-100" : "opacity-0"
                    )} />
            </div>
        </dialog>
    )
}
