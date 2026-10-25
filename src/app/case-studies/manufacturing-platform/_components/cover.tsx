import { GradientPanel } from "@/components/cards/gradient-panel"
import { CASE_STUDY_HOOK } from "../content"

// The page's cover, after rachelchen.tech's project pages: the same apricot panel and headline
// as the homepage tile, so opening the card reads as the tile growing into the page. The stats
// stay out of the cover because the page's stat row follows right below. No arrow, because the
// cover isn't a link.
export function CaseStudyCover() {
    return (
        <div className="media-frame aspect-[4/3] md:aspect-[16/9] print:hidden">
            <GradientPanel tone="apricot">
                <div className="flex h-full flex-col justify-between p-6 text-[rgb(var(--panel-ink))] md:p-10">
                    <span className="text-label text-[rgb(var(--panel-ink)/0.72)]">Case study</span>
                    <p className="type-h1 max-w-[12em] whitespace-pre-line">{CASE_STUDY_HOOK}</p>
                </div>
            </GradientPanel>
        </div>
    )
}
