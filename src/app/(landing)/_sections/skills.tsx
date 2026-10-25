import { SectionHeading } from "../_components/section-heading"

const categories = [
    {
        label: "Containers & Orchestration",
        skills: ["Kubernetes (EKS, Talos)", "ECS", "Docker", "Helm"],
    },
    {
        label: "Infrastructure & Cloud",
        skills: ["AWS", "Linux", "Proxmox VE", "Terraform / OpenTofu"],
    },
    {
        label: "Observability",
        skills: ["Prometheus", "Grafana", "CloudWatch", "OpenTelemetry"],
    },
    {
        label: "CI/CD",
        skills: ["GitHub Actions", "ArgoCD"],
    },
    {
        label: "Languages",
        skills: ["Python", "TypeScript", "Java", "Bash", "SQL"],
    },
    {
        label: "AI & Automation",
        skills: ["Mastra", "Multi-agent workflows", "LLM evals & observability"],
    },
]

// Ruled rows, label left and value right; the case study's lists use the same rows.
// No closing rule: the next section's hairline closes the list.
export function SkillsSection() {
    return (
        <>
            <SectionHeading id="skills-title">Skills</SectionHeading>
            <dl>
                {categories.map(({ label, skills }) => (
                    <div
                        key={label}
                        className="grid gap-x-4 gap-y-1 border-t border-rule py-4 md:grid-cols-content md:items-baseline md:py-5">
                        <dt className="text-ui text-muted md:col-span-3 lg:col-span-2">
                            {label}
                        </dt>
                        <dd className="text-ink md:col-span-5 lg:col-span-6">
                            {skills.join(', ')}
                        </dd>
                    </div>
                ))}
            </dl>
        </>
    )
}
