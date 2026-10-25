import { FC } from "react"
import { ArrowUpRight } from "lucide-react"
import { GradientPanel, TGradientTone } from "./gradient-panel"

export interface ILinkCardProps {
    eyebrow: string
    headline: string
    tone: TGradientTone
}

// Typographic panel on a mesh gradient that points somewhere else, e.g. more work on GitHub.
// Same padding, eyebrow row and arrow as FeatureCard, so the two panels read as one family.
export const LinkCard: FC<ILinkCardProps> = ({ eyebrow, headline, tone }) => {
    return (
        <GradientPanel tone={tone}>
            <div className="flex h-full w-full flex-col justify-between p-6 text-[rgb(var(--panel-ink))] lg:p-8">
                <div className="flex items-start justify-between gap-4">
                    <span className="text-label text-[rgb(var(--panel-ink)/0.72)]">{eyebrow}</span>
                    <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/panel:-translate-y-0.5 group-hover/panel:translate-x-0.5" />
                </div>
                <p className="type-h2">{headline}</p>
            </div>
        </GradientPanel>
    )
}
