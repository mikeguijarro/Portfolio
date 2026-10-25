import { FC } from "react"
import { ArrowUpRight } from "lucide-react"
import { GradientPanel, TGradientTone } from "./gradient-panel"

export type TFeatureStat = { value: string, label: string }

export interface IFeatureCardProps {
    eyebrow: string
    headline: string
    stats: TFeatureStat[]
    tone: TGradientTone
}

// A case-study preview on a mesh gradient: the page's headline and a few of its stats.
// The stats drop out on phones, where the tile is too short for them. Hover comes from a
// PanelLink parent.
export const FeatureCard: FC<IFeatureCardProps> = ({ eyebrow, headline, stats, tone }) => {
    return (
        <GradientPanel tone={tone}>
            <div className="flex h-full w-full flex-col justify-between p-6 text-[rgb(var(--panel-ink))] lg:p-8">
                <div className="flex items-start justify-between gap-4">
                    <span className="text-label text-[rgb(var(--panel-ink)/0.72)]">{eyebrow}</span>
                    <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/panel:-translate-y-0.5 group-hover/panel:translate-x-0.5" />
                </div>
                <div className="flex flex-col gap-6 lg:gap-8">
                    <p className="type-h2 max-w-[14em] whitespace-pre-line">{headline}</p>
                    <dl className="hidden gap-4 sm:grid" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
                        {stats.map(({ value, label }) => (
                            <div key={label} className="flex flex-col-reverse justify-end gap-1.5 border-t border-[rgb(var(--panel-ink)/0.28)] pt-3">
                                <dt className="text-meta text-[rgb(var(--panel-ink)/0.72)]">{label}</dt>
                                <dd className="type-metric !text-[1.75rem]">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </GradientPanel>
    )
}
