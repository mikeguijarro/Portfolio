'use client'

import { motion, Variants } from "framer-motion"
import { Server, Boxes, Activity, Code2, GitBranch, Bot } from "lucide-react"

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const categories = [
    {
        label: "Infrastructure & Cloud",
        icon: Server,
        skills: ["AWS", "Linux", "Proxmox VE", "Terraform / OpenTofu"],
    },
    {
        label: "Containers & Orchestration",
        icon: Boxes,
        skills: ["Kubernetes (EKS, Talos)", "ECS", "Docker", "Helm"],
    },
    {
        label: "Observability",
        icon: Activity,
        skills: ["Prometheus", "Grafana", "CloudWatch", "OpenTelemetry"],
    },
    {
        label: "Languages",
        icon: Code2,
        skills: ["Python", "TypeScript", "Java", "Bash", "SQL"],
    },
    {
        label: "CI/CD",
        icon: GitBranch,
        skills: ["GitHub Actions", "ArgoCD"],
    },
    {
        label: "AI & Automation",
        icon: Bot,
        skills: ["Mastra", "Multi-agent workflows", "LLM evals & observability"],
    },
]

export function SkillsSection() {
    return (
        <div>
            <h2 className="font-bold text-6xl ml-6 mb-2">Skills</h2>
            <p className="text-slate-500 text-lg ml-6 mb-8">Technologies I build and operate with</p>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
                {categories.map(({ label, icon: Icon, skills }) => (
                    <motion.div
                        key={label}
                        variants={cardVariants}
                        className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-slate-100">
                                <Icon className="w-4 h-4 text-slate-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800">{label}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 text-sm font-medium bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
