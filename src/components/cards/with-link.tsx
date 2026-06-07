import Link from "next/link";
import { FC, HTMLAttributeAnchorTarget } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface IWithLinkProps {
    href: string
    target: HTMLAttributeAnchorTarget
}

export function withLink<P extends {}>(
    Component: React.ComponentType<P>
): React.ComponentType<P & IWithLinkProps> {
    const ComponentWithLink: FC<P & IWithLinkProps> = ({ href, target, ...props }) => {
        return (
            <div className="relative w-full h-full">
                <Component {...(props as unknown as P)} />
                <div className="absolute top-0 right-0 m-4">
                    <Link
                        href={href}
                        target={target}
                        onMouseDown={(e) => { e.stopPropagation() }}
                        onTouchStart={(e) => { e.stopPropagation() }}
                        className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'rounded-full bg-white/80 backdrop-blur-lg transition-all')}>
                        <ArrowUpRight />
                    </Link>
                </div>
            </div>
        )
    }

    return ComponentWithLink
}