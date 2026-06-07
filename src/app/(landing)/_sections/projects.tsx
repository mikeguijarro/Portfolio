import { Grid } from "@/components/grid/grid";
import { GridContentWrapper } from "../_components/grid-content-wrapper";
import { IProjectGridItem } from "../types";

export function ProjectsSection() {
    const items: IProjectGridItem[] = [
        {
            id: 'a',
            layout: { i: "a", x: 0, y: 0, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/dartcom_demo.mp4',
                title: 'Talk to your databases with AI'
            }
        },
        {
            id: 'b',
            layout: { i: "b", x: 3, y: 0, w: 1, h: 2 },
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
            layout: { i: "c", x: 1, y: 13, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/building_technical_excellence.mp4',
                title: 'Building technical excellence at AWS',
            }
        },
    ]
    return (
        <div>
            <h2 className="font-bold text-6xl ml-6 mb-4">Personal projects</h2>
            <Grid items={items} GridContent={GridContentWrapper} />
        </div>
    )
}