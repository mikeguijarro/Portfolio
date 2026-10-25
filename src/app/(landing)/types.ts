import { IGridContent, IGridItem } from "@/components/grid/types"
import { TGradientTone } from "@/components/cards/gradient-panel"
import { TFeatureStat } from "@/components/cards/feature-card"

type TProjectDataCommon = {
    title: string
    meta?: string
    href?: string
}

export type TProjectData =
    | {
        type: 'image'
        src: string
        alt: string
    } & TProjectDataCommon
    | {
        type: 'video'
        src: string
    } & TProjectDataCommon
    | {
        // A typographic preview of a case study: its headline and a few of its stats.
        type: 'feature'
        eyebrow: string
        headline: string
        stats: TFeatureStat[]
        tone: TGradientTone
    } & TProjectDataCommon
    | {
        // A typographic tile that links elsewhere; needs an href.
        type: 'link'
        eyebrow: string
        headline: string
        href: string
        tone: TGradientTone
    } & TProjectDataCommon

export interface IProjectGridItem extends IGridItem<TProjectData> { }
export interface IProjectGridContent extends IGridContent<TProjectData> { }
