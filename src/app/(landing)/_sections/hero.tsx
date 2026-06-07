'use client'

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ImageCard } from "@/components/cards/image-card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const socialLinks = [
    { href: 'https://github.com/MIKEGUIJARRO', icon: faGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/miguel-alejandro-guijarro-mart%C3%ADnez-6a2997180/', icon: faLinkedinIn, label: 'LinkedIn' },
    { href: 'https://x.com/mikeguijarro', icon: faXTwitter, label: 'X' },
]

const techBadges = ['AWS', 'Kubernetes', 'Docker', 'TypeScript', 'Linux']

export function HeroSection() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center gap-12 py-20">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col items-center gap-4">
                <motion.div variants={itemVariants}>
                    <div className="w-56 h-72 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                        <ImageCard alt="Miguel Guijarro" src="/profile_pic.jpeg" />
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex gap-2">
                    {socialLinks.map(({ href, icon, label }) => (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            aria-label={label}
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                            <FontAwesomeIcon icon={icon} />
                        </Link>
                    ))}
                </motion.div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6 w-full max-w-lg text-center lg:text-start">
                <motion.div variants={itemVariants}>
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">
                        Systems Developer → Site Reliability Engineer
                    </p>
                    <h1 className="text-6xl lg:text-8xl font-bold uppercase leading-none">
                        Miguel<br />Guijarro
                    </h1>
                </motion.div>
                <motion.p variants={itemVariants} className="text-lg text-slate-600 leading-relaxed">
                    Passionate about infrastructure automation, observability, and platform engineering.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {techBadges.map(tech => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium bg-slate-100 rounded-full border border-slate-200 text-slate-700">
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}
