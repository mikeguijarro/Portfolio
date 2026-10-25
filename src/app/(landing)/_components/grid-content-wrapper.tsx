'use client'

import { FC } from "react"
import { GridContent } from "./grid-content"
import { IProjectGridContent } from "../types"
import { TooltipCard } from "@/components/cards/tooltip-card"
import { WrapperCard } from "../../../components/cards/wrapper-card"

// Tiles render at rest, with no scroll-triggered entrance (DESIGN.md › Calm motion).
export const GridContentWrapper: FC<IProjectGridContent> = ({ id, type, isDragging, data }) => {
    return (
        <TooltipCard>
            <WrapperCard shadowHidden={!isDragging}>
                <GridContent id={id} type={type} data={data} />
            </WrapperCard>
        </TooltipCard>
    )
}
