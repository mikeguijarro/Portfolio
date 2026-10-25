import type { Metadata } from "next";
import { ArchitectureDiagram } from "./_components/architecture-diagram";
import { CaseStudyCover } from "./_components/cover";
import { CASE_STUDY_STATS, CASE_STUDY_TITLE } from "./content";
import { cn } from "@/lib/utils";
import { StatStrip } from "@/components/stat-strip";
import { BackLink, MobileBar, RailLeft, RailRight } from "../../(landing)/_components/site-rails";
import { SectionHeading, sectionClassName } from "../../(landing)/_components/section-heading";
import { ContactSection, SiteFooter } from "../../(landing)/_sections/footer";
import { EMAIL, GITHUB_HREF, TSection } from "../../(landing)/contact";

export const metadata: Metadata = {
    title: "Case study: Multi-tenant manufacturing platform | Miguel Guijarro",
    description: "Architecture and reliability design of a multi-tenant SaaS for machining job shops: database-enforced tenant isolation, stateless API, hardened containers and a three-tier test suite.",
}

const stack = ['NestJS', 'PostgreSQL 18', 'Redis', 'BullMQ', 'AWS S3', 'Docker', 'nginx', 'React PWA']

// Same treatment as the hero's Currently / Previously row.
const facts = [
    { term: 'Role', detail: 'Architect and lead engineer' },
    { term: 'Status', detail: '2026 · Preparing first production rollout' },
    { term: 'Scope', detail: 'API, data model, containers, web app' },
]

// Numbered to match the badges in the architecture diagram.
const decisions = [
    {
        title: 'Tenant isolation enforced by the database',
        why: 'A query that forgets the tenant returns no rows instead of every client’s data. One bug cannot become a data leak.',
        what: 'Every table has a Postgres row-level security policy keyed on the tenant of the current transaction. The API connects as a non-owner role the policies apply to, and foreign keys include the tenant, so a row can never point at another tenant’s row.',
    },
    {
        title: 'Stateless API that scales horizontally',
        why: 'Any instance can serve any request, so scaling out or replacing an instance needs no coordination.',
        what: 'No in-memory state: the cache lives in Redis, job queues in Postgres (BullMQ’s Postgres backend) so each job runs once on whichever instance takes it, and realtime messages fan out across instances through Postgres NOTIFY/LISTEN. Server-sent events ping every 25 s to survive proxy timeouts.',
    },
    {
        title: 'Graceful degradation instead of outages',
        why: 'The cache only saves work: losing it costs latency, never correctness or availability.',
        what: 'Domain events are written in the same transaction as the change (transactional outbox) and drive cache invalidation. If Redis is unreachable, reads fall back to computing the answer and the failure is logged.',
    },
    {
        title: 'Self-healing tenant provisioning',
        why: 'Infrastructure converges to the desired state on its own, the same way a Kubernetes controller does.',
        what: 'Each tenant gets its own private S3 bucket. An idempotent reconcile job creates it, retries on failure and retires it on deletion; a sweep every 5 minutes catches lost jobs and configuration drift (detected by a settings digest).',
    },
    {
        title: 'Hardened, deploy-safe containers',
        why: 'Deploys roll out without broken sessions, and stale clients pick up new versions on their own.',
        what: 'Multi-stage images; nginx runs unprivileged on 8080 with TLS at the load balancer, a /healthz endpoint and security headers. Content-hashed assets are cached for a year, the app shell never is, and open tabs reload when a deploy removes the code they were running.',
    },
    {
        title: 'Fail fast on bad configuration',
        why: 'Misconfiguration surfaces in the pipeline, not in production, and logs are safe to ship to any aggregator.',
        what: 'Environment variables are validated at startup and the image build stops on an invalid API origin. Logs are structured JSON with passwords, tokens and cookies redacted.',
    },
]

const testTiers = [
    { tier: 'Unit', files: '51 files', detail: 'Business rules and validation, no I/O' },
    { tier: 'Integration', files: '26 files', detail: 'Repositories and infrastructure against real Postgres and Redis' },
    { tier: 'End-to-end', files: '15 files', detail: 'The whole API over HTTP, per module' },
]

const roadmap = [
    'CI pipeline: lint, three test tiers and image build on every change',
    'Infrastructure as code for the production environment',
    'OpenTelemetry traces and metrics, with dashboards',
    'SLOs for availability and p95 latency, with alerting',
    'Automated backups with a tested restore, and runbooks',
]

const CASE_SECTIONS: TSection[] = [
    { id: 'architecture', label: 'Architecture' },
    { id: 'decisions', label: 'Decisions' },
    { id: 'testing', label: 'Testing' },
    { id: 'rollout', label: 'Rollout' },
    { id: 'contact', label: 'Contact' },
]

// The homepage's section rhythm, tightened for print.
const caseSectionClassName = cn(sectionClassName, "print:gap-1 print:border-0 print:pt-2")
const printTitleClassName = "print:text-[14px]"

// Two-digit index shared by the decisions and the roadmap.
const index = (i: number) => String(i + 1).padStart(2, '0')

// Same 12-column frame, rails and section system as the landing page, so the hero's main button
// lands somewhere familiar; the page ends on Contact instead of a dead end. Rails, contact and
// footer drop out in print.
export default function ManufacturingPlatformCaseStudy() {
    return (
        <div className="mx-auto grid w-full max-w-frame grid-cols-frame gap-x-4 px-4 xl:px-6 print:block print:max-w-none print:px-0">
            <RailLeft sections={CASE_SECTIONS}>
                <BackLink />
            </RailLeft>

            <main className="col-span-12 row-start-1 flex min-w-0 flex-col gap-20 pb-24 lg:col-span-8 lg:col-start-3 lg:gap-24 lg:pb-32 lg:pt-content-start print:max-w-none print:gap-2 print:px-0 print:py-0 print:text-[10px] print:[zoom:0.8]">
                {/* The page's opening, spaced like the homepage hero: cover → header 64px,
                    header → stats 64px. */}
                <div>
                    <MobileBar sections={CASE_SECTIONS}>
                        <BackLink />
                    </MobileBar>

                    <CaseStudyCover />

                    <header className="mt-16 space-y-6 print:mt-0 print:space-y-1.5">
                        <p className="text-label print:text-[10px]">
                            Case study · Platform architecture &amp; reliability
                        </p>
                        <h1 className="type-h1 print:text-2xl">
                            {CASE_STUDY_TITLE}
                        </h1>
                        <p className="type-lead max-w-[32em] text-ink print:max-w-none print:text-[12px] print:leading-snug">
                            Designed the architecture: database-enforced tenant isolation, a stateless API that scales
                            horizontally, and 1,300+ tests against real Postgres and Redis.
                        </p>
                        <p className="max-w-measure text-body text-muted print:max-w-none print:text-[10.5px]">
                            A production-tracking platform for CNC machining shops: from purchase order through plant-floor work
                            orders to shipping and invoicing. Built at Smartops; a machining shop in Mexico is the first tenant,
                            and every new client runs as an isolated tenant.
                        </p>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3 print:grid-cols-3 print:gap-2">
                            {facts.map(({ term, detail }) => (
                                <div key={term} className="flex flex-col gap-1">
                                    <dt className="text-ui text-muted print:text-[10px]">{term}</dt>
                                    <dd className="text-ui print:text-[10px]">{detail}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="font-mono text-meta text-muted print:text-[10px]">{stack.join(' · ')}</p>
                        {/* Byline for the printed version; on screen the rails and footer carry it. */}
                        <p className="hidden text-ui text-muted print:block print:text-[10px]">
                            <span className="font-medium text-ink">Miguel Guijarro</span>
                            {' · SRE / DevOps Engineer · '}
                            <a href={`mailto:${EMAIL}`} className="link-quiet">{EMAIL}</a>
                            {' · '}
                            <a href={GITHUB_HREF} target="_blank" rel="noopener noreferrer" className="link-quiet">github.com/MIKEGUIJARRO</a>
                        </p>
                    </header>

                    <StatStrip stats={CASE_STUDY_STATS} className="mt-16 print:mt-2" />
                </div>

                <section id="architecture" aria-labelledby="architecture-title" className={caseSectionClassName}>
                    <SectionHeading id="architecture-title" className={printTitleClassName}>Architecture</SectionHeading>
                    {/* The homepage tiles' frame and caption: hairline media, caption underneath. */}
                    <figure className="flex flex-col gap-2.5">
                        <div className="media-frame p-4 sm:p-6 print:p-1">
                            <div className="print:mx-auto print:max-w-[50%]">
                                <ArchitectureDiagram />
                            </div>
                        </div>
                        <figcaption className="text-ui text-muted print:text-[9px]">
                            Numbered badges match the reliability decisions below. Dashed line: optional dependency.
                        </figcaption>
                    </figure>
                </section>

                <section id="decisions" aria-labelledby="decisions-title" className={caseSectionClassName}>
                    <SectionHeading id="decisions-title" className={printTitleClassName}>Reliability decisions</SectionHeading>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 print:grid-cols-2 print:gap-2">
                        {decisions.map(({ title, what, why }, i) => (
                            <article key={title} className="break-inside-avoid space-y-3 border-t border-rule pt-4 print:space-y-1 print:pt-1">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-meta tabular-nums text-muted">{index(i)}</span>
                                    <h3 className="type-h3 print:text-[12px]">{title}</h3>
                                </div>
                                <p className="text-body font-medium text-ink print:text-[10.5px] print:leading-snug">{why}</p>
                                <p className="text-ui text-muted print:text-[10.5px] print:leading-snug">{what}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="testing" aria-labelledby="testing-title" className={cn(caseSectionClassName, "print:break-inside-avoid")}>
                    <SectionHeading
                        id="testing-title"
                        className={printTitleClassName}
                        description="Disposable Postgres 18 and Redis run in Docker Compose with health checks; the test database is dropped and rebuilt from the migrations on every run.">
                        Testing against real infrastructure
                    </SectionHeading>
                    {/* The Skills section's ruled rows. */}
                    <dl>
                        {testTiers.map(({ tier, files, detail }) => (
                            <div key={tier} className="grid gap-x-4 gap-y-1 border-t border-rule py-4 md:grid-cols-content md:items-baseline md:py-5 print:py-1">
                                <dt className="text-ui text-muted md:col-span-3 lg:col-span-2 print:text-[10.5px]">{tier}</dt>
                                <dd className="text-ink md:col-span-5 lg:col-span-6 print:text-[10.5px]">
                                    <span className="tabular-nums">{files}.</span> {detail}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section id="rollout" aria-labelledby="rollout-title" className={cn(caseSectionClassName, "print:break-inside-avoid")}>
                    <SectionHeading id="rollout-title" className={printTitleClassName}>Next: production rollout</SectionHeading>
                    <ol>
                        {roadmap.map((item, i) => (
                            <li key={item} className="flex items-baseline gap-3 border-t border-rule py-4 md:py-5 print:py-1">
                                <span className="font-mono text-meta tabular-nums text-muted">{index(i)}</span>
                                <span className="text-ink print:text-[10.5px]">{item}</span>
                            </li>
                        ))}
                    </ol>
                </section>

                <section id="contact" aria-labelledby="contact-title" className={cn(sectionClassName, "print:hidden")}>
                    <ContactSection />
                </section>
            </main>

            <RailRight />

            <footer className="col-span-12 print:hidden">
                <SiteFooter />
            </footer>
        </div>
    )
}
