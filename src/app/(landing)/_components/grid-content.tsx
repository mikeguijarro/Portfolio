
import { withTitle } from "@/components/cards/with-title"

import { FeatureCard } from "@/components/cards/feature-card"
import { ImageCard } from "@/components/cards/image-card"
import { LinkCard } from "@/components/cards/link-card"
import { PanelLink } from "@/components/cards/panel-link"
import { VideoCard } from "@/components/cards/video-card"

import { IProjectGridContent } from "../types"

const ImageCardWithTitle = withTitle(ImageCard)
const VideoCardWithTitle = withTitle(VideoCard)
const PanelLinkWithTitle = withTitle(PanelLink)

// Internal pages open in place; everything else opens in a new tab.
const targetFor = (href?: string) => href?.startsWith('/') ? undefined : '_blank'

export const GridContent = ({ data }: Omit<IProjectGridContent, 'isDragging'>) => {
    const target = targetFor(data.href)
    const caption = { title: data.title, meta: data.meta, href: data.href, target }

    switch (data.type) {
        case 'image':
            return <ImageCardWithTitle {...caption} src={data.src} alt={data.alt} isScaleHover={true} lightboxCaption={data.title} lightboxMeta={data.meta} />
        case 'video':
            return <VideoCardWithTitle {...caption} src={data.src} />
        case 'feature':
            // Typographic panels are clickable as a whole, so they always need a link.
            return (
                <PanelLinkWithTitle {...caption} panelHref={data.href ?? '#'} panelTarget={target}>
                    <FeatureCard eyebrow={data.eyebrow} headline={data.headline} stats={data.stats} tone={data.tone} />
                </PanelLinkWithTitle>
            )
        case 'link':
            return (
                <PanelLinkWithTitle {...caption} panelHref={data.href} panelTarget={target}>
                    <LinkCard eyebrow={data.eyebrow} headline={data.headline} tone={data.tone} />
                </PanelLinkWithTitle>
            )
        default:
            return <>Unsupported media type</>
    }
}
