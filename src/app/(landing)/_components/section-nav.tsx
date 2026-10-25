'use client'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { TSection } from "../contact"

interface ISectionNavProps {
    sections: TSection[]
    className?: string
}

// Highlights the section that crosses the upper third of the viewport.
export function SectionNav({ sections, className }: ISectionNavProps) {
    const [activeId, setActiveId] = useState<string | null>(null)
    const sectionIds = sections.map(({ id }) => id).join(',')

    useEffect(() => {
        const elements = sectionIds
            .split(',')
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => element !== null)

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                }
            },
            { rootMargin: '-30% 0px -55% 0px' }
        )

        // Above the first section nothing is active; the last section is too short to reach
        // the band, so the page bottom selects it.
        const firstElement = elements.at(0)
        const lastId = elements.at(-1)?.id ?? null
        const handleScroll = () => {
            if (firstElement && firstElement.getBoundingClientRect().top > window.innerHeight * 0.3) {
                setActiveId(null)
            } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
                setActiveId(lastId)
            }
        }

        elements.forEach((element) => observer.observe(element))
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [sectionIds])

    return (
        <ul className={className}>
            {sections.map(({ id, label }) => {
                const isActive = activeId === id
                return (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            aria-current={isActive ? 'location' : undefined}
                            className={cn(
                                "relative text-ui leading-none transition-colors duration-200 hover:text-ink",
                                "before:absolute before:-left-3 before:top-1/2 before:h-[5px] before:w-[5px] before:-translate-y-1/2 before:rounded-full before:bg-accent before:opacity-0 before:transition-opacity before:duration-300 max-lg:before:hidden",
                                isActive ? "text-ink before:opacity-100" : "text-muted"
                            )}>
                            {label}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
