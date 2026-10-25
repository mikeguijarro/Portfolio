import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ISectionHeadingProps {
    id: string
    children: ReactNode
    description?: string
    className?: string
}

// Shared by every titled section on both pages, so the rhythm stays one system:
// a hairline, 40–56px to the title, and 40px from the title block to the content.
export const sectionClassName = "flex flex-col gap-10 border-t border-rule pt-10 lg:pt-14"

export const sectionTitleClassName = "type-h2"

// Section header on the 8-column content grid: title in five columns, note in the last three,
// sharing the title's last baseline.
export function SectionHeading({ id, children, description, className }: ISectionHeadingProps) {
    return (
        <div className="grid gap-y-3 md:grid-cols-content md:gap-x-4 md:[align-items:last_baseline]">
            <h2 id={id} className={cn(sectionTitleClassName, "md:col-span-5", className)}>
                {children}
            </h2>
            {description ? (
                <p className="max-w-measure text-ui text-muted md:col-span-3">
                    {description}
                </p>
            ) : null}
        </div>
    )
}
