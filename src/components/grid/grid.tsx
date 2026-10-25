'use client'

import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import './grid.css'

import { useMemo, useState } from 'react'
import { ItemCallback, Layout, Responsive, WidthProvider } from "react-grid-layout"

import { GridItem } from './item'
import { IGridContent, IGridItem, TGridItemTypes } from './types'

const ResponsiveGridLayout = WidthProvider(Responsive)

// 210px rows give the 3-column tiles 16:9 media above the 64px caption. Phones use
// shorter rows with their own single-column layout so videos stay 16:9 there too.
const ROW_HEIGHT = { lg: 210, md: 210, sm: 120 }
const PHONE_ROWS: Record<TGridItemTypes, number> = {
    rectangle_4_2: 2,
    row_2x1: 2,
    square_1x1: 3,
    column_1x2: 3,
    square_2x2: 3,
}

type TBreakpoint = keyof typeof ROW_HEIGHT

interface IGridProps<T> {
    items: IGridItem<T>[]
    GridContent: React.ComponentType<IGridContent<T>>
}

export function Grid<T>({ items, GridContent }: IGridProps<T>) {

    const [activeDraggedItem, setActiveDraggedItem] = useState<string | null>(null)
    const [activeDraggedItemDelayed, setActiveDraggedItemDelayed] = useState<string | null>(null)
    const [breakpoint, setBreakpoint] = useState<TBreakpoint>('lg')

    const memoItemsLayout: Layout[] = useMemo(() => items.map((gridItem) => gridItem.layout), [items])

    // Phones read the desktop layout top to bottom, left to right, one tile per row.
    const memoPhoneLayout: Layout[] = useMemo(() => {
        const ordered = [...items].sort((a, b) => a.layout.y - b.layout.y || a.layout.x - b.layout.x)
        let y = 0
        return ordered.map(({ layout, type }) => {
            const h = PHONE_ROWS[type]
            const phoneLayout = { ...layout, x: 0, y, w: 1, h }
            y += h
            return phoneLayout
        })
    }, [items])

    /* Drag Handlers */
    const onDragStartHandler: ItemCallback = (layout, oldItem, newItem, placeholder, event, element) => {
        setActiveDraggedItem(oldItem.i)
        setActiveDraggedItemDelayed(oldItem.i)
    }

    const onDragStopHandler: ItemCallback = (layout, oldItem, newItem, placeholder, event, element) => {
        setActiveDraggedItem(null)
        setTimeout(() => {
            setActiveDraggedItemDelayed(null)
        }, 200)
    }

    return (
        <ResponsiveGridLayout
            className='layout'
            compactType={'vertical'}
            layouts={{ lg: memoItemsLayout, md: memoItemsLayout, sm: memoPhoneLayout }}
            // Measured against the grid's own width, which is now the 8 content columns (~656–923px on desktop).
            breakpoints={{ lg: 700, md: 460, sm: 0 }}
            cols={{ lg: 4, md: 2, sm: 1 }}
            margin={[16, 40]}
            containerPadding={[0, 0]}
            rowHeight={ROW_HEIGHT[breakpoint]}
            onBreakpointChange={(newBreakpoint) => setBreakpoint(newBreakpoint as TBreakpoint)}
            onDragStart={onDragStartHandler}
            onDragStop={onDragStopHandler}
            preventCollision={false}
            isResizable={false}>
            {items.map((item) => {
                const isDraggingDelayed = activeDraggedItemDelayed ? activeDraggedItemDelayed === item.id : false
                const isDragging = activeDraggedItem ? activeDraggedItem === item.id : false
                return (
                    <GridItem
                        key={item.id}
                        isDragging={isDragging}
                        isDraggingDelayed={isDraggingDelayed}
                    >
                        <GridContent id={item.id} type={item.type} isDragging={isDragging} data={item.data} />
                    </GridItem>
                )
            })}
        </ResponsiveGridLayout>
    )
}
