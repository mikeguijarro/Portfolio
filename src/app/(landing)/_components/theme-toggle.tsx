'use client'

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { THEME_STORAGE_KEY } from "../theme"

function isDarkNow() {
    const root = document.documentElement
    if (root.classList.contains('dark')) return true
    if (root.classList.contains('light')) return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function handleToggle() {
    const next = isDarkNow() ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(next)
    try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
        // Private mode or blocked storage: the switch still applies for this visit.
    }
}

interface IThemeToggleProps {
    className?: string
}

// The visible label and icon swap through .when-light / .when-dark (globals.css), the same
// rules that drive the theme, so server HTML always matches and nothing flickers.

export function ThemeToggle({ className }: IThemeToggleProps) {
    return (
        <button
            type="button"
            onClick={handleToggle}
            className={cn("group inline-flex items-center gap-2 text-ui text-muted transition-colors duration-200 hover:text-ink", className)}>
            <span className="when-light">Dark mode</span>
            <span className="when-dark">Light mode</span>
            <Moon aria-hidden="true" className="when-light h-3.5 w-3.5" />
            <Sun aria-hidden="true" className="when-dark h-3.5 w-3.5" />
        </button>
    )
}

export function ThemeToggleIcon({ className }: IThemeToggleProps) {
    return (
        <button
            type="button"
            onClick={handleToggle}
            className={cn("inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-ink", className)}>
            <span className="sr-only when-light">Switch to dark mode</span>
            <span className="sr-only when-dark">Switch to light mode</span>
            <Moon aria-hidden="true" className="when-light h-4 w-4" />
            <Sun aria-hidden="true" className="when-dark h-4 w-4" />
        </button>
    )
}
