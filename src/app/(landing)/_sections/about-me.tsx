import { Grid } from "@/components/grid/grid";
import { GridContentWrapper } from "../_components/grid-content-wrapper";
import { IProjectGridItem } from "../types";

export function AboutMeSection() {
    const items: IProjectGridItem[] = [
        {
            id: 'a',
            layout: { i: "a", x: 0, y: 0, w: 1, h: 2 },
            type: 'square_1x1',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro building in public',
                src: 'https://dh4coajsj2ptp.cloudfront.net/3D7E444A-01E0-4867-AE1A-80F07328F5D3.jpeg',
                href: '',
                title: 'Attendee at Cloud Native CDMX meetup'
            }
        },
        {
            id: 'b',
            layout: { i: "b", x: 1, y: 0, w: 1, h: 2 },
            type: 'square_1x1',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro building in public',
                src: 'https://dh4coajsj2ptp.cloudfront.net/B88145F0-DC64-4AE7-A1CF-8850215EEDA6.jpeg',
                href: '',
                title: 'Constantly learning about Linux & K8'
            }
        },
        {
            id: 'c',
            layout: { i: "c", x: 2, y: 0, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro building in public',
                src: 'https://dh4coajsj2ptp.cloudfront.net/CD7C19F7-0BA7-49A3-9004-F502D48E826B.jpeg',
                href: '',
                title: 'Love my best buddy'
            }
        },
        {
            id: 'd',
            layout: { i: "d", x: 3, y: 0, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro building in public',
                src: 'https://dh4coajsj2ptp.cloudfront.net/IMG_0805.jpeg',
                href: '',
                title: 'Running a production-grade home lab 24/7'
            }
        },
        {
            id: 'e',
            layout: { i: "e", x: 4, y: 0, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro building in public',
                src: 'https://dh4coajsj2ptp.cloudfront.net/shout-out-amazon.png',
                href: '',
                title: 'Focused on delivering results'
            }
        },
    ]
    return (
        <div>
            <div>
                <h2 className="font-bold text-6xl ml-6 mb-4">About me</h2>
                <Grid items={items} GridContent={GridContentWrapper} />
            </div>
        </div>
    )
}
