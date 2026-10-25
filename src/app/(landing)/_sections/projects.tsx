import { Grid } from "@/components/grid/grid";
import { GridContentWrapper } from "../_components/grid-content-wrapper";
import { IProjectGridItem } from "../types";
import { SectionHeading } from "../_components/section-heading";
import { CASE_STUDY_HREF, GITHUB_HREF } from "../contact";
import { CASE_STUDY_HOOK, CASE_STUDY_STATS, CASE_STUDY_TITLE } from "../../case-studies/manufacturing-platform/content";

// The tile previews the case study with stats the hero doesn't already show (tests are in the proof strip).
const caseStudyStats = CASE_STUDY_STATS.filter(({ key }) => key !== 'tests')

// Rows pair one wide tile with one narrow tile, strongest work first; the GitHub tile closes
// the last row. Captions stay under ~55 characters so narrow tiles never clip the key figure.
export function ProjectsSection() {
    const items: IProjectGridItem[] = [
        {
            id: 'case-study',
            layout: { i: "case-study", x: 0, y: 0, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'feature',
                tone: 'apricot',
                eyebrow: 'Case study',
                headline: CASE_STUDY_HOOK,
                stats: caseStudyStats,
                title: CASE_STUDY_TITLE,
                meta: 'Smartops · Architecture & reliability',
                href: CASE_STUDY_HREF,
            }
        },
        {
            id: 'c',
            layout: { i: "c", x: 3, y: 0, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                src: 'https://dh4coajsj2ptp.cloudfront.net/shout-out-amazon.png',
                title: 'Fix built 3 weeks before a defect reached 300+ publishers',
                meta: 'Amazon · Shout-out',
                alt: 'Shout-out received at Amazon'
            }
        },
        {
            id: 'a',
            layout: { i: "a", x: 0, y: 2, w: 1, h: 2 },
            type: 'column_1x2',
            data: {
                type: 'image',
                src: 'https://dh4coajsj2ptp.cloudfront.net/IMG_0805.jpeg',
                title: '6-node Talos Kubernetes lab on bare-metal Proxmox',
                meta: 'Home lab · Terraform',
                alt: 'Home lab running the Kubernetes cluster'
            }
        },
        {
            id: 'd',
            layout: { i: "d", x: 1, y: 2, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/building_technical_excellence.mp4',
                title: 'Driving case resolutions: a strategic approach for AWS Support',
                meta: 'AWS · Video',
            }
        },
        {
            id: 'e',
            layout: { i: "e", x: 0, y: 4, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/sat-ai.mp4',
                href: 'https://github.com/mikeguijarro/sat-ai',
                title: 'AI agent that checks appointment availability at Mexico’s tax authority (SAT)',
                meta: 'Open source · GitHub',
            }
        },
        {
            id: 'b',
            layout: { i: "b", x: 3, y: 4, w: 1, h: 2 },
            type: 'square_1x1',
            data: {
                type: 'image',
                src: 'https://dh4coajsj2ptp.cloudfront.net/758AF948-A8DF-4ECD-8D61-7DCA3E0F464E.jpeg',
                title: 'Architected Smartops microservices from scratch',
                meta: 'Smartops · C4 model',
                alt: 'C4 design for microservices architecture'
            }
        },
        {
            id: 'f',
            layout: { i: "f", x: 0, y: 6, w: 3, h: 2 },
            type: 'rectangle_4_2',
            data: {
                type: 'video',
                src: 'https://dh4coajsj2ptp.cloudfront.net/dartcom_demo.mp4',
                title: 'Talk to your databases with AI',
                meta: 'AI demo · Video'
            }
        },
        {
            id: 'github',
            layout: { i: "github", x: 3, y: 6, w: 1, h: 2 },
            type: 'row_2x1',
            data: {
                type: 'link',
                tone: 'periwinkle',
                eyebrow: 'Open source',
                headline: 'GitHub',
                href: GITHUB_HREF,
                title: 'More projects on GitHub',
                meta: 'github.com/MIKEGUIJARRO',
            }
        },
    ]
    return (
        <>
            <SectionHeading id="projects-title">Projects</SectionHeading>
            <Grid items={items} GridContent={GridContentWrapper} />
        </>
    )
}
