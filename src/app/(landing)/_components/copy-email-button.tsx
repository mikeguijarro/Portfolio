'use client'

import { ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { EMAIL } from "../contact"

interface ICopyEmailButtonProps {
    children: ReactNode
    className?: string
}

export function CopyEmailButton({ children, className }: ICopyEmailButtonProps) {
    const { toast } = useToast()

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            toast({ title: "Email copied", description: `${EMAIL} is on your clipboard.` })
        } catch {
            toast({ title: "Couldn't copy the email", description: `Write to ${EMAIL} instead.` })
        }
    }

    return (
        <button type="button" onClick={handleClick} className={cn("cursor-pointer", className)}>
            {children}
        </button>
    )
}
