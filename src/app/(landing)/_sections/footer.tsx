import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CopyEmailButton } from "../_components/copy-email-button";
import { ProfileLinks } from "../_components/hero-parts";
import { SectionHeading } from "../_components/section-heading";
import { EMAIL } from "../contact";

export function ContactSection() {
    return (
        <>
            <SectionHeading id="contact-title">Contact</SectionHeading>

            {/* Same button size and link row as the hero's actions. */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    <a
                        href={`mailto:${EMAIL}`}
                        className="type-lead link-quiet break-all text-ink">
                        {EMAIL}
                    </a>
                    <CopyEmailButton className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                        Copy email
                    </CopyEmailButton>
                </div>
                <ProfileLinks />
            </div>
        </>
    )
}

// Spans all 12 frame columns, under the rails.
export function SiteFooter() {
    return (
        <div className="flex flex-col gap-3 border-t border-rule py-8 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="text-ui text-ink">Miguel Guijarro, SRE / DevOps Engineer</span>
            <p className="text-label">
                © {new Date().getFullYear()} Miguel Alejandro Guijarro Martinez
            </p>
        </div>
    )
}
