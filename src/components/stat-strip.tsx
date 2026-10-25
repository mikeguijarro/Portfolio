import { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type TStat = { value: string, label: string }

interface IStatStripProps {
    stats: TStat[]
    className?: string
    style?: CSSProperties
}

// A row of figures under an ink rule: the hero's proof strip and the case study's stats.
// Two per row on phones, four from md (two content columns each). The print: classes only
// matter on the case study, which has a print layout.
export function StatStrip({ stats, className, style }: IStatStripProps) {
    return (
        <dl className={cn("grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 print:grid-cols-4 print:gap-2", className)} style={style}>
            {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse justify-end gap-3 border-t border-ink pt-4 print:gap-0 print:pt-1">
                    <dt className="text-ui text-muted print:text-[10px]">{label}</dt>
                    <dd className="type-metric print:text-lg">{value}</dd>
                </div>
            ))}
        </dl>
    )
}
