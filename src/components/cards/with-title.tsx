import Link from "next/link";
import { FC, HTMLAttributeAnchorTarget } from "react";
import { ArrowUpRight } from "lucide-react";

interface IWithTitleProps {
    title: string
    meta?: string
    href?: string
    target?: HTMLAttributeAnchorTarget
}

// Caption sits under the media in a fixed 64px block (two 15/1.35 title lines + meta), so media
// edges line up across a row. When the tile has a link, the title is the link.
export function withTitle<P extends {}>(
    Component: React.ComponentType<P>
): React.ComponentType<P & IWithTitleProps> {
    const ComponentWithTitle: FC<P & IWithTitleProps> = ({ title, meta, href, target, ...props }) => {
        return (
            <figure className="group/tile flex h-full w-full flex-col gap-2.5">
                <div className="media-frame min-h-0 flex-1">
                    <Component {...(props as unknown as P)} />
                </div>
                <figcaption className="flex h-16 shrink-0 flex-col gap-1">
                    {href ? (
                        <Link
                            href={href}
                            target={target}
                            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                            onMouseDown={(e) => { e.stopPropagation() }}
                            onTouchStart={(e) => { e.stopPropagation() }}
                            draggable={false}
                            className="group/link line-clamp-2 text-ui font-medium leading-[1.35] text-ink">
                            <span className="link-quiet">{title}</span>
                            <ArrowUpRight
                                aria-hidden="true"
                                className="ml-1 inline h-3.5 w-3.5 -translate-y-px text-muted transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </Link>
                    ) : (
                        <span className="line-clamp-2 text-ui font-medium leading-[1.35] text-ink">{title}</span>
                    )}
                    {meta ? (
                        <span className="truncate font-mono text-meta text-muted">{meta}</span>
                    ) : null}
                </figcaption>
            </figure>
        )
    }

    return ComponentWithTitle
}
