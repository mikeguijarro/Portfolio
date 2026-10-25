import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { StatStrip } from "@/components/stat-strip";
import { CASE_STUDY_HREF, SOCIAL_LINKS } from "../contact";

// Building blocks of the hero.

export const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

const profileLinks = SOCIAL_LINKS.filter(({ label }) => label === 'GitHub' || label === 'LinkedIn')

// Proof before adjectives: only figures already stated elsewhere on the site. Each label
// starts with the noun its figure counts.
const proof = [
    { value: '~2', label: 'Years at Amazon, across AWS and Kindle' },
    { value: '300+', label: 'Publishers hit by a defect; the fix was built 3 weeks earlier' },
    { value: '6', label: 'Nodes in a Talos Kubernetes lab, built with Terraform' },
    { value: '1,300+', label: 'Tests against real Postgres and Redis' },
]

interface IHeroPartProps {
    className?: string
    style?: CSSProperties
}

// GitHub and LinkedIn as quiet external links; the hero and the Contact section share them.
export function ProfileLinks({ className }: { className?: string }) {
    return (
        <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
            {profileLinks.map(({ label, href }) => (
                <li key={label}>
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-ui font-medium text-ink">
                        <span className="link-quiet">{label}</span>
                        <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </li>
            ))}
        </ul>
    )
}

export function HeroActions({ className, style }: IHeroPartProps) {
    return (
        <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-4", className)} style={style}>
            <Link href={CASE_STUDY_HREF} className={cn(buttonVariants({ size: 'lg' }))}>
                Read the case study
            </Link>
            <ProfileLinks />
        </div>
    )
}

export function ProofStrip({ className, style }: IHeroPartProps) {
    return <StatStrip stats={proof} className={className} style={style} />
}
