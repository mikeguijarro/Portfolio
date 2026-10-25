import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type TGradientTone = 'apricot' | 'periwinkle'

const toneClassName: Record<TGradientTone, string> = {
    apricot: 'gradient-apricot',
    periwinkle: 'gradient-periwinkle',
}

interface IGradientPanelProps {
    tone: TGradientTone
    className?: string
    children: ReactNode
}

// A soft mesh-gradient surface with grain (see .gradient-* in globals.css). The gradient sits
// on its own oversized layer so it can drift on hover without revealing an edge; text uses the
// tone's ink through --panel-ink.
export function GradientPanel({ tone, className, children }: IGradientPanelProps) {
    return (
        <div className={cn("relative isolate h-full w-full overflow-hidden", toneClassName[tone], className)}>
            <div
                aria-hidden="true"
                className={cn(
                    "gradient-layer absolute -inset-[8%] transition-transform duration-1000 ease-out-expo group-hover/panel:-translate-x-[2%] group-hover/panel:scale-[1.06]",
                    toneClassName[tone]
                )} />
            <div aria-hidden="true" className="panel-grain absolute inset-0" />
            <div className="relative h-full">{children}</div>
        </div>
    )
}
