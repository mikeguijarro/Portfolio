'use client'

import { FC, useEffect, useRef, useState } from 'react'
import screenfull from 'screenfull'
import { Maximize2, Minimize2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface IVideoPlayerProps {
    url: string
}

type TVideoElement = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

// Native <video> that autoplays muted and looping while it's on screen, and pauses when scrolled
// away so off-screen videos don't use bandwidth. With reduced motion it rests on its first frame
// and only plays in fullscreen. Fullscreen turns the sound on.
export const VideoPlayer: FC<IVideoPlayerProps> = ({ url }) => {

    const [isFullscreen, setIsFullscreen] = useState(false)
    const refVideo = useRef<TVideoElement>(null)

    useEffect(() => {
        const video = refVideo.current
        if (video === null) {
            return
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                video.play().catch(() => { })
            } else if (!(screenfull.isEnabled && screenfull.isFullscreen)) {
                video.pause()
            }
        }, { threshold: 0.25 })
        observer.observe(video)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!screenfull.isEnabled) {
            return
        }
        const handleChange = () => {
            const isVideoFullscreen = screenfull.element === refVideo.current
            setIsFullscreen(isVideoFullscreen)
            if (isVideoFullscreen) {
                refVideo.current?.play().catch(() => { })
            }
        }
        screenfull.on('change', handleChange)
        return () => screenfull.off('change', handleChange)
    }, [])

    const handleFullscreen = () => {
        const video = refVideo.current
        if (video === null) {
            return
        }
        if (screenfull.isEnabled) {
            screenfull.toggle(video).catch((err: Error) => {
                console.error('Error attempting to toggle full-screen mode:', err.message)
            })
        } else {
            // iOS Safari only allows fullscreen on the video element itself.
            video.webkitEnterFullscreen?.()
        }
    }

    return (
        <div className="relative h-full w-full bg-ink/5">
            <video
                ref={refVideo}
                // The fragment makes browsers paint the first frame as the resting poster.
                src={`${url}#t=0.1`}
                muted={!isFullscreen}
                loop
                playsInline
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                className={cn('absolute inset-0 h-full w-full', isFullscreen ? 'object-contain' : 'object-cover')}
            />
            <button
                type="button"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Play fullscreen with sound'}
                className='absolute bottom-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-rule bg-surface text-ink transition-[opacity,border-color] duration-200 hover:border-ink focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/tile:opacity-100 [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11'
                onMouseDown={(e) => { e.stopPropagation() }}
                onTouchStart={(e) => { e.stopPropagation() }}
                onClick={handleFullscreen}>
                {isFullscreen ? <Minimize2 className="h-4 w-4" aria-hidden="true" /> : <Maximize2 className="h-4 w-4" aria-hidden="true" />}
            </button>
        </div>
    )
}
