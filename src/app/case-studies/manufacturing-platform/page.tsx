import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArchitectureDiagram } from "./_components/architecture-diagram";

export const metadata: Metadata = {
    title: "Case study: Multi-tenant manufacturing platform | Miguel Guijarro",
    description: "Architecture and reliability design of a multi-tenant SaaS for machining job shops: database-enforced tenant isolation, stateless API, hardened containers and a three-tier test suite.",
}

const stack = ['NestJS', 'PostgreSQL 18', 'Redis', 'BullMQ', 'AWS S3', 'Docker', 'nginx', 'React PWA']

// Counted from the repository.
const stats = [
    { value: '123', label: 'API operations' },
    { value: '38', label: 'Row-level security policies' },
    { value: '1,300+', label: 'Automated tests, 3 tiers' },
    { value: '19', label: 'Versioned DB migrations' },
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

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 print:mb-1 print:text-[10px]">
            {children}
        </h2>
    )
}

export default function ManufacturingPlatformCaseStudy() {
    return (
        <main className="container max-w-5xl py-16 space-y-16 print:max-w-none print:px-0 print:py-0 print:space-y-2 print:text-[10px] print:[zoom:0.8]">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 print:hidden">
                <ArrowLeft className="w-4 h-4" />
                Back to portfolio
            </Link>

            <header className="space-y-6 print:space-y-1.5">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest print:text-[10px]">
                    Case study · Platform architecture &amp; reliability
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance print:text-2xl">
                    Multi-tenant SaaS for machining job shops
                </h1>
                <p className="text-xl font-medium text-slate-900 max-w-3xl print:max-w-none print:text-[12px] print:leading-snug">
                    Designed the architecture: database-enforced tenant isolation, a stateless API that scales
                    horizontally, and 1,300+ tests against real Postgres and Redis.
                </p>
                <p className="text-base text-slate-600 leading-relaxed max-w-3xl print:max-w-none print:text-[10.5px]">
                    A production-tracking platform for CNC machining shops: from purchase order through plant-floor work
                    orders to shipping and invoicing. Built at Smartops; a machining shop in Mexico is the first tenant,
                    and every new client runs as an isolated tenant.
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm print:grid-cols-3 print:gap-2 print:text-[10px]">
                    <div>
                        <dt className="text-slate-500">Role</dt>
                        <dd className="font-medium">Architect and lead engineer</dd>
                    </div>
                    <div>
                        <dt className="text-slate-500">Status</dt>
                        <dd className="font-medium">2026 · Preparing first production rollout</dd>
                    </div>
                    <div>
                        <dt className="text-slate-500">Scope</dt>
                        <dd className="font-medium">API, data model, containers, web app</dd>
                    </div>
                </dl>
                <div className="flex flex-wrap gap-2">
                    {stack.map(tech => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium bg-slate-100 rounded-full border border-slate-200 text-slate-700 print:text-[10px] print:py-0.5">
                            {tech}
                        </span>
                    ))}
                </div>
                <p className="text-sm text-slate-600 print:text-[10px]">
                    <span className="font-semibold text-slate-900">Miguel Guijarro</span>
                    {' · SRE / DevOps Engineer · '}
                    <a href="mailto:mikeguijarrodev@gmail.com" className="underline underline-offset-2 hover:text-slate-900">mikeguijarrodev@gmail.com</a>
                    {' · '}
                    <a href="https://github.com/MIKEGUIJARRO" target="_blank" className="underline underline-offset-2 hover:text-slate-900">github.com/MIKEGUIJARRO</a>
                </p>
            </header>

            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
                {stats.map(({ value, label }) => (
                    <div key={label} className="flex flex-col-reverse justify-end border border-slate-200 rounded-2xl p-4 sm:p-6 print:p-2">
                        <dt className="text-sm text-slate-500 leading-snug mt-1 print:mt-0 print:text-[10px]">{label}</dt>
                        <dd className="text-3xl sm:text-4xl font-bold tabular-nums tracking-tight print:text-lg">{value}</dd>
                    </div>
                ))}
            </dl>

            <section>
                <SectionLabel>Architecture</SectionLabel>
                <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 print:p-1">
                    <div className="print:max-w-[50%] print:mx-auto">
                        <ArchitectureDiagram />
                    </div>
                    <p className="text-xs text-slate-500 mt-4 print:mt-0 print:text-[9px] text-center">
                        Numbered badges match the reliability decisions below. Dashed line: optional dependency.
                    </p>
                </div>
            </section>

            <section>
                <SectionLabel>Reliability decisions</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
                    {decisions.map(({ title, what, why }, i) => (
                        <article key={title} className="border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3 print:p-2 print:space-y-1 break-inside-avoid">
                            <div className="flex items-baseline gap-3">
                                <span className="text-xs font-semibold text-slate-500 tabular-nums">0{i + 1}</span>
                                <h3 className="font-bold text-lg print:text-[12px]">{title}</h3>
                            </div>
                            <p className="text-sm font-medium text-slate-900 leading-relaxed print:text-[10.5px] print:leading-snug">{why}</p>
                            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 print:pt-1 print:text-[10.5px] print:leading-snug">{what}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4 print:break-inside-avoid">
                <div>
                    <SectionLabel>Testing against real infrastructure</SectionLabel>
                    <ul className="space-y-3 print:space-y-1">
                        {testTiers.map(({ tier, files, detail }) => (
                            <li key={tier} className="flex gap-4 border-b border-slate-200 pb-3 print:pb-1">
                                <span className="font-bold w-28 shrink-0 print:w-20">{tier}</span>
                                <span className="text-sm text-slate-600 print:text-[10.5px]">
                                    <span className="font-medium text-slate-900">{files}.</span> {detail}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed print:mt-1 print:text-[10px]">
                        Disposable Postgres 18 and Redis run in Docker Compose with health checks; the test database is
                        dropped and rebuilt from the migrations on every run.
                    </p>
                </div>
                <div>
                    <SectionLabel>Next: production rollout</SectionLabel>
                    <ul className="space-y-3 print:space-y-1">
                        {roadmap.map(item => (
                            <li key={item} className="flex gap-3 text-sm print:text-[10.5px]">
                                <span className="mt-1.5 w-2 h-2 rounded-full border-2 border-slate-400 shrink-0" />
                                <span className="text-slate-600">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    )
}
