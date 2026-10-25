import { Grid } from "@/components/grid/grid";
import { GridContentWrapper } from "../_components/grid-content-wrapper";
import { IProjectGridItem } from "../types";
import { SectionHeading } from "../_components/section-heading";

export function AboutMeSection() {
    const items: IProjectGridItem[] = [
        {
            id: 'a',
            layout: { i: "a", x: 0, y: 0, w: 2, h: 2 },
            type: 'square_1x1',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro at a Cloud Native CDMX meetup',
                src: 'https://dh4coajsj2ptp.cloudfront.net/3D7E444A-01E0-4867-AE1A-80F07328F5D3.jpeg',
                title: 'Cloud Native CDMX meetup',
                meta: 'Community',
            }
        },
        {
            id: 'b',
            layout: { i: "b", x: 2, y: 0, w: 1, h: 2 },
            type: 'square_1x1',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro studying Linux and Kubernetes',
                src: 'https://dh4coajsj2ptp.cloudfront.net/B88145F0-DC64-4AE7-A1CF-8850215EEDA6.jpeg',
                title: 'Working toward the CKA certification',
                meta: 'Certification',
            }
        },
        {
            id: 'c',
            layout: { i: "c", x: 3, y: 0, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                alt: 'Miguel Guijarro with his best buddy',
                src: 'https://dh4coajsj2ptp.cloudfront.net/CD7C19F7-0BA7-49A3-9004-F502D48E826B.jpeg',
                title: 'My best buddy',
                meta: 'Off hours',
            }
        },
    ]
    return (
        <>
            {/* Title and lead read as one heading block, 24px apart like the case study's header. */}
            <div className="flex flex-col gap-6">
                <SectionHeading id="about-title">About</SectionHeading>
                <p className="type-lead max-w-[32em]">
                    Based in Mexico City. I go to Cloud Native CDMX meetups, I’m working toward the CKA certification, and I’m building Smartops.
                </p>
            </div>
            <Grid items={items} GridContent={GridContentWrapper} />
        </>
    )
}
