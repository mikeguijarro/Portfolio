type TNode = {
    x: number
    y: number
    w: number
    h: number
    title: string
    lines: string[]
    dark?: boolean
    // The reliability decisions on the page that this part carries.
    badges?: number[]
    // Drawn as several instances: two offset frames behind the node.
    stacked?: boolean
}

type TEdge = {
    from: [number, number]
    to: [number, number]
    dashed?: boolean
}

type TGroup = { x: number, y: number, w: number, h: number, label: string }

type TLayout = {
    id: string
    width: number
    height: number
    nodes: TNode[]
    edges: TEdge[]
    group?: TGroup
}

// Wide screens and print: left to right.
const wide: TLayout = {
    id: 'wide',
    width: 980,
    height: 430,
    nodes: [
        { x: 10, y: 165, w: 190, h: 100, title: 'Browser / PWA', lines: ['Installable app', 'Offline reads via', 'service worker'] },
        { x: 240, y: 175, w: 150, h: 80, title: 'Load balancer', lines: ['TLS termination', 'Health checks'] },
        { x: 440, y: 30, w: 210, h: 80, title: 'Web app container', lines: ['nginx, non-root, :8080', 'Immutable hashed assets'], badges: [5] },
        { x: 440, y: 205, w: 230, h: 100, title: 'API instances × N', lines: ['NestJS, stateless', 'REST + server-sent events', 'Any instance serves any request'], dark: true, badges: [2, 6], stacked: true },
        { x: 720, y: 10, w: 250, h: 120, title: 'PostgreSQL 18', lines: ['Row-level security per tenant', 'Job queues (BullMQ on Postgres)', 'Transactional event outbox', 'NOTIFY/LISTEN fan-out'], badges: [1] },
        { x: 720, y: 160, w: 250, h: 70, title: 'Redis', lines: ['Shared cache, fails open'], badges: [3] },
        { x: 720, y: 255, w: 250, h: 70, title: 'S3', lines: ['Private bucket per tenant'], badges: [4] },
        { x: 720, y: 350, w: 250, h: 70, title: 'Email provider', lines: ['Invitations, password setup'] },
    ],
    edges: [
        { from: [200, 215], to: [240, 215] },
        { from: [390, 200], to: [440, 75] },
        { from: [390, 230], to: [440, 255] },
        { from: [682, 240], to: [720, 70] },
        { from: [682, 250], to: [720, 195], dashed: true },
        { from: [682, 265], to: [720, 290] },
        { from: [682, 280], to: [720, 385] },
    ],
}

// Phones: top to bottom, with the backing services grouped under the API.
const narrow: TLayout = {
    id: 'narrow',
    width: 360,
    height: 765,
    nodes: [
        { x: 20, y: 0, w: 320, h: 80, title: 'Browser / PWA', lines: ['Installable app', 'Offline reads via service worker'] },
        { x: 20, y: 110, w: 320, h: 80, title: 'Load balancer', lines: ['TLS termination', 'Health checks'] },
        { x: 20, y: 220, w: 150, h: 100, title: 'Web app', lines: ['nginx, non-root', 'Immutable assets'], badges: [5] },
        { x: 190, y: 220, w: 142, h: 100, title: 'API × N', lines: ['NestJS, stateless', 'REST + SSE', 'Any instance'], dark: true, badges: [2, 6], stacked: true },
        { x: 20, y: 385, w: 320, h: 120, title: 'PostgreSQL 18', lines: ['Row-level security per tenant', 'Job queues (BullMQ on Postgres)', 'Transactional event outbox', 'NOTIFY/LISTEN fan-out'], badges: [1] },
        { x: 20, y: 515, w: 320, h: 70, title: 'Redis', lines: ['Shared cache, fails open'], badges: [3] },
        { x: 20, y: 595, w: 320, h: 70, title: 'S3', lines: ['Private bucket per tenant'], badges: [4] },
        { x: 20, y: 675, w: 320, h: 70, title: 'Email provider', lines: ['Invitations, password setup'] },
    ],
    edges: [
        { from: [180, 80], to: [180, 110] },
        { from: [150, 190], to: [95, 220] },
        { from: [210, 190], to: [261, 220] },
        { from: [261, 328], to: [261, 350] },
    ],
    group: { x: 10, y: 350, w: 340, h: 405, label: 'Backing services' },
}

function Badge({ x, y, n, onDark }: { x: number, y: number, n: number, onDark?: boolean }) {
    return (
        <g>
            <circle cx={x} cy={y} r={10} className={onDark ? 'fill-paper' : 'fill-ink'} />
            <text x={x} y={y + 4} fontSize="11" fontWeight="500" textAnchor="middle" className={onDark ? 'fill-ink' : 'fill-paper'}>
                {n}
            </text>
        </g>
    )
}

function Diagram({ layout, className }: { layout: TLayout, className: string }) {
    const marker = `arrow-${layout.id}`
    const titleId = `architecture-title-${layout.id}`
    const descId = `architecture-desc-${layout.id}`
    return (
        <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-labelledby={`${titleId} ${descId}`}
            className={className}>
            <title id={titleId}>Architecture of the platform</title>
            <desc id={descId}>
                The browser reaches a load balancer, which routes to a static web app container and to stateless API
                instances. The API uses PostgreSQL, Redis, S3 and an email provider.
            </desc>
            <defs>
                <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
                </marker>
            </defs>
            {layout.group && (
                <g>
                    <rect x={layout.group.x} y={layout.group.y} width={layout.group.w} height={layout.group.h} rx={6} className="fill-paper stroke-rule" />
                    <text x={layout.group.x + 14} y={layout.group.y + 22} fontSize="11" fontWeight="500" letterSpacing="0.08em" className="fill-muted font-mono">
                        {layout.group.label.toUpperCase()}
                    </text>
                </g>
            )}
            {layout.edges.map(({ from, to, dashed }, i) => (
                <line
                    key={i}
                    x1={from[0]}
                    y1={from[1]}
                    x2={to[0]}
                    y2={to[1]}
                    className="stroke-muted"
                    strokeWidth="1.5"
                    strokeDasharray={dashed ? '4 3' : undefined}
                    markerEnd={`url(#${marker})`} />
            ))}
            {layout.nodes.map(node => (
                <g key={node.title}>
                    {node.stacked && (
                        <>
                            <rect x={node.x + 8} y={node.y - 8} width={node.w} height={node.h} rx={6} className="fill-paper stroke-rule" />
                            <rect x={node.x + 4} y={node.y - 4} width={node.w} height={node.h} rx={6} className="fill-surface stroke-rule" />
                        </>
                    )}
                    <rect
                        x={node.x}
                        y={node.y}
                        width={node.w}
                        height={node.h}
                        rx={6}
                        className={node.dark ? 'fill-ink stroke-ink' : 'fill-surface stroke-rule'} />
                    <text x={node.x + 16} y={node.y + 26} fontSize="15" fontWeight="500" className={node.dark ? 'fill-paper' : 'fill-ink'}>
                        {node.title}
                    </text>
                    {node.lines.map((line, i) => (
                        <text key={line} x={node.x + 16} y={node.y + 48 + i * 19} fontSize="12.5" className={node.dark ? 'fill-paper/70' : 'fill-muted'}>
                            {line}
                        </text>
                    ))}
                    {node.badges?.map((n, i, badges) => (
                        <Badge key={n} x={node.x + node.w - 18 - (badges.length - 1 - i) * 24} y={node.y + 20} n={n} onDark={node.dark} />
                    ))}
                </g>
            ))}
        </svg>
    )
}

export function ArchitectureDiagram() {
    return (
        <>
            <Diagram layout={narrow} className="w-full max-w-sm mx-auto h-auto md:hidden print:hidden" />
            <Diagram layout={wide} className="w-full h-auto hidden md:block print:block" />
        </>
    )
}
