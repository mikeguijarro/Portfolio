'use client'

import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

type logo = {
    key: string
    src: string
    alt: string
    width?: number
    height?: number
}

const logosArr: logo[] = [
    {
        key: 'amazon',
        src: '/amazon.svg',
        alt: 'Logo Amazon',
        width: 100,
        height: 100,
    },
    {
        key: 'aws',
        src: '/aws.svg',
        alt: 'Logo AWS',
        width: 100,
        height: 100,
    },
    {
        key: 'climateai',
        src: '/climateai.svg',
        alt: 'Logo Climate Ai',
        width: 200,
        height: 100,
    },
    {
        key: 'tec',
        src: '/tec.svg',
        alt: 'Logo Tec de Monterrey',
        width: 200,
        height: 100,
    },
]

export const CarouselLogos = () => {
    return (
        <div className="space-y-24">
            <p className="text-center font-semibold text-xl">Built software / deployed infrastructure at</p>
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent>
                    {
                        logosArr.map((logo) => (
                            <CarouselItem key={logo.key} className="flex md:basis-1/2 lg:basis-1/3 items-center justify-center">
                                <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}
