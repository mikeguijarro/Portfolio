import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

interface IGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    isDragging: boolean
    isDraggingDelayed: boolean
}

export const GridItem = React.forwardRef<HTMLDivElement, IGridItemProps>(({ style, className, onMouseDown, onMouseUp, onTouchEnd, children, isDragging, isDraggingDelayed, ...props }, ref) => {

    return (
        <div
            ref={ref}
            style={{
                ...style,
                zIndex: isDraggingDelayed ? 20 : 10
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            className={cn(className)}
            {...props}>
            <div className={cn('h-full w-full transition-transform duration-300 ease-out-expo hover:cursor-grab', isDragging && 'scale-[1.02] cursor-grabbing')}>
                {children}
            </div>
        </div>
    )
})

GridItem.displayName = 'GridItem'