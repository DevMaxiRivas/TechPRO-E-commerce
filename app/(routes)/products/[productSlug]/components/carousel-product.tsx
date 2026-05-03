import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getURLImage } from "@/lib/get-url-image";
import Image from "next/image";

interface CarouselProductProps {
    images: Array<{
        id: number
        url: string
    }>
}


const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;
    return (
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem
                            key={image.id}
                            className="group"
                        >
                            <Image
                                src={getURLImage(image.url)}
                                width={500}
                                height={500}
                                alt="Image Product"
                                loading="eager"
                                className="mx-auto h-48 w-96 object-contain rounded-lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default CarouselProduct;