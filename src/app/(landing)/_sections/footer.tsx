'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faLinkedinIn, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useToast } from "@/components/ui/use-toast";


export function FooterSection() {

    const { toast } = useToast()

    const onEmailClick = () => {
        toast({
            title: "Email copied successfully ✅",
            description: "mikeguijarrodev@gmail.com copied to clipboard",
        })
        navigator.clipboard.writeText('mikeguijarrodev@gmail.com');
    }

    return (
        <div className="py-16 space-y-6">
            <div className="text-center my-40">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Open to SRE & Platform Engineering roles
                </p>
                <h2 className="font-bold text-4xl">Let&apos;s connect</h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                <Link
                    href="https://github.com/MIKEGUIJARRO"
                    target="_blank"
                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full transition-all')}
                    aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/miguel-alejandro-guijarro-mart%C3%ADnez-6a2997180/"
                    target="_blank"
                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full transition-all')}
                    aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                </Link>
                <Link
                    href="https://x.com/mikeguijarro"
                    target="_blank"
                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full transition-all')}
                    aria-label="X / Twitter">
                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </Link>
                <Link
                    href="https://www.instagram.com/st.mikeg"
                    target="_blank"
                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full transition-all')}
                    aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </Link>
                <Button
                    variant="outline"
                    className="space-x-2"
                    onClick={onEmailClick}>
                    <Copy />
                    <span>mikeguijarrodev@gmail.com</span>
                </Button>
            </div>
            <p className="text-center text-sm text-slate-400 pt-10">
                © {new Date().getFullYear()} Miguel Alejandro Guijarro Martinez. All rights reserved.
            </p>
        </div>
    )
}
