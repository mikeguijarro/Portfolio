import Link from "next/link"
import { ReactNode } from "react"
import { CopyEmailButton } from "./copy-email-button"
import { SectionNav } from "./section-nav"
import { ThemeToggle, ThemeToggleIcon } from "./theme-toggle"
import { CASE_STUDY_HREF, TSection } from "../contact"

interface IRailProps {
    sections: TSection[]
    // A page link after the section list, e.g. <CaseStudyLink /> or <BackLink />.
    children?: ReactNode
}

// The one persistent availability signal on the page, and the only pulsing element.
function Availability() {
    return (
        <span className="inline-flex items-center gap-2.5 text-ui text-ink">
            <span className="status-dot status-dot-live" aria-hidden="true" />
            Open to US-remote roles
        </span>
    )
}

const pageLinkClassName = "text-ui leading-none text-muted transition-colors duration-200 hover:text-ink"

export function CaseStudyLink() {
    return <Link href={CASE_STUDY_HREF} className={pageLinkClassName}>Case study</Link>
}

export function BackLink() {
    return <Link href="/" className={pageLinkClassName}>Back to portfolio</Link>
}

// Left rail (columns 1–2): name at the top, section nav on the content-start line.
export function RailLeft({ sections, children }: IRailProps) {
    return (
        <aside className="sticky top-0 col-span-2 col-start-1 row-start-1 hidden h-dvh self-start pt-6 text-ui lg:block print:hidden">
            <Link href="/" className="text-ui text-ink">
                Miguel Guijarro
            </Link>
            <nav aria-label="Sections" className="absolute top-content-start flex flex-col gap-8">
                <SectionNav sections={sections} className="flex flex-col items-start gap-3 leading-5" />
                {children}
            </nav>
        </aside>
    )
}

// Right rail (columns 11–12): availability, the quickest way to reach out, and the theme switch.
export function RailRight() {
    return (
        <aside className="sticky top-0 col-span-2 col-start-11 row-start-1 hidden h-dvh flex-col items-end gap-3 self-start pt-6 text-right text-ui lg:flex print:hidden">
            <Availability />
            <CopyEmailButton className="text-ui text-muted transition-colors duration-200 hover:text-ink">
                Copy email
            </CopyEmailButton>
            <ThemeToggle />
        </aside>
    )
}

// Below 1024px the rails fold into one top bar.
export function MobileBar({ sections, children }: IRailProps) {
    return (
        <header className="mb-10 flex flex-col gap-4 border-b border-rule pb-4 pt-5 lg:hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <Link href="/" className="text-ui text-ink">Miguel Guijarro</Link>
                <span className="flex items-center gap-2">
                    <Availability />
                    <ThemeToggleIcon className="-mr-2" />
                </span>
            </div>
            <nav aria-label="Sections" className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
                <SectionNav sections={sections} className="contents" />
                {children}
            </nav>
        </header>
    )
}
