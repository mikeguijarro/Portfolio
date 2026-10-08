import { Grid } from "@/components/grid/grid";
import { GridContentWrapper } from "../_components/grid-content-wrapper";
import { IProjectGridItem } from "../types";

export function ProjectsSection() {
    const items: IProjectGridItem[] = [
        {
            id: 'a',
            layout: { i: "a", x: 0, y: 0, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                src: 'https://dh4coajsj2ptp.cloudfront.net/IMG_0805.jpeg',
                title: '6-node Talos Kubernetes lab on bare-metal Proxmox, built with Terraform',
                alt: 'Home lab running the Kubernetes cluster'
            }
        },
        {
            id: 'b',
            layout: { i: "b", x: 3, y: 2, w: 1, h: 2 },
            type: 'square_1x1',
            data: {
                type: 'image',
                src: 'https://dh4coajsj2ptp.cloudfront.net/758AF948-A8DF-4ECD-8D61-7DCA3E0F464E.jpeg',
                title: 'Architected SmartOps microservices from scratch',
                alt: 'C4 design for microservices architecture'
            }
        },
        {
            id: 'c',
            layout: { i: "c", x: 0, y: 4, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                src: 'https://dh4coajsj2ptp.cloudfront.net/shout-out-amazon.png',
                title: 'Amazon shout-out: fix built 3 weeks before a defect reached 300+ publishers',
                alt: 'Shout-out received at Amazon'
            }
        },
        {
            id: 'd',
            layout: { i: "d", x: 1, y: 0, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/building_technical_excellence.mp4',
                title: 'Building technical excellence at AWS',
            }
        },
        {
            id: 'e',
            layout: { i: "e", x: 0, y: 2, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/sat-ai.mp4',
                href: 'https://github.com/mikeguijarro/sat-ai',
                title: 'AI agent that checks appointment availability at Mexico\'s tax authority (SAT)',
            }
        },
        {
            id: 'f',
            layout: { i: "f", x: 1, y: 4, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/dartcom_demo.mp4',
                title: 'Talk to your databases with AI'
            }
        },
    ]
    return (
        <div>
            <h2 className="font-bold text-6xl ml-6 mb-4">Projects</h2>
            <Grid items={items} GridContent={GridContentWrapper} />
        </div>
    )
}