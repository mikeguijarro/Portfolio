import { cn } from "@/lib/utils";
import { HeroActions, ProofStrip, delay } from "../_components/hero-parts";

const facts = [
    { term: 'Currently', detail: 'Building Smartops in Mexico City', className: 'sm:col-span-3 lg:col-span-2' },
    { term: 'Previously', detail: 'Nearly two years at Amazon, across AWS and Kindle', className: 'sm:col-span-5 lg:col-span-4' },
    { term: 'Citizenship', detail: 'US and Mexican', className: 'sm:col-span-3 lg:col-span-2' },
]

// After rachelchen.tech: one serif sentence, then a quiet Currently / Previously row.
// Rows are spaced explicitly on the 8px rhythm: sentence → facts 40px, facts → actions 40px,
// actions → proof 64px.
export function HeroSection() {
    return (
        <section aria-labelledby="hero-name" className="grid grid-cols-1 md:grid-cols-content md:gap-x-4">
            <h1 id="hero-name" className="settle type-statement md:col-span-8" style={delay(0)}>
                Miguel Guijarro is an SRE <br className="hidden md:inline" />
                who builds for fun.
            </h1>

            <dl className="settle mt-10 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-content md:col-span-8" style={delay(120)}>
                {facts.map(({ term, detail, className }) => (
                    <div key={term} className={cn("flex flex-col gap-1", className)}>
                        <dt className="text-ui text-muted">{term}</dt>
                        <dd className="text-ui">{detail}</dd>
                    </div>
                ))}
            </dl>

            <HeroActions className="settle mt-10 md:col-span-8" style={delay(180)} />

            <ProofStrip className="settle mt-16 md:col-span-8" style={delay(240)} />
        </section>
    )
}
