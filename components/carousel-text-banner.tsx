"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

import Autoplay from "embla-carousel-autoplay"


export const dataCarouselTop = [
    {
        id: 1,
        title: "Carousel Text Banner 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur enim.",
        link: "/"
    },
    {
        id: 2,
        title: "Carousel Text Banner 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur enim.",
        link: "/"
    },
    {
        id: 3,
        title: "Carousel Text Banner 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur enim.",
        link: "/"
    }
]

const CarouselTextBanner = () => {
    const router = useRouter();
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel
                className="w-full max-w-4xl mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2500, //ms
                    }),
                ]}
            >
                <CarouselContent>
                    {
                        dataCarouselTop.map(({ title, description, link, id }) => (
                            <CarouselItem
                                key={id}
                                className="cursor-pointer"
                                onClick={() => router.push(link)}
                            >
                                <div>
                                    <Card className="ring-0 border-none shadow-none rounded-none bg-transparent">
                                        <CardContent className="flex flex-col justify-center p-2 items-center">
                                            <p className="sm:text-lg text-wrap dark:text-white">{title}</p>
                                            <p className="text-xs text-wrap dark:text-gray-200">{description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextBanner;