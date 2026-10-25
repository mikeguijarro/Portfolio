import Image from "next/image"
import { cn } from "@/lib/utils"

type logo = {
    key: string
    src: string
    alt: string
    width: number
    height: number
    // Heights are tuned by eye so the marks carry the same visual weight.
    className: string
}

const logosArr: logo[] = [
    { key: 'amazon', src: '/amazon.svg', alt: 'Amazon', width: 603, height: 182, className: 'h-6' },
    { key: 'aws', src: '/aws.svg', alt: 'AWS', width: 304, height: 182, className: 'h-7' },
    { key: 'climateai', src: '/climateai.svg', alt: 'ClimateAi', width: 6674, height: 1892, className: 'h-8' },
    { key: 'tec', src: '/tec.svg', alt: 'Tecnológico de Monterrey', width: 195, height: 42, className: 'h-9' },
]

// A static row: four marks on the 8-column content grid, two columns each.
export const CarouselLogos = () => {
    return (
        <section aria-labelledby="logos-title" className="-mt-4 flex flex-col gap-6 lg:-mt-8">
            <h2 id="logos-title" className="text-label">Worked and studied at</h2>
            <ul className="grid grid-cols-2 items-center gap-x-4 gap-y-8 md:grid-cols-4">
                {logosArr.map((logo) => (
                    <li key={logo.key} className="flex items-center">
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className={cn("logo-mark w-auto max-w-[9rem] object-contain object-left", logo.className)} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
