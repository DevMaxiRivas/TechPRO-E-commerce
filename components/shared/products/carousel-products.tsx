import CarouselCardProduct from "./carousel-card-product";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ProductType } from "@/types/product";

const CarouselProducts = (props: { products: ProductType[] }) => {
    const products = props.products;
    return (
        <Carousel>
            <CarouselContent className="-ml-2 md:-ml-4 gap-4">
                {
                    products !== null && products.map((product: ProductType) => {
                        return (
                            <CarouselItem key={product.id} className="flex flex-col md:basis-1/2 lg:basis-1/3 group">
                                <div className="h-full p-1">
                                    <CarouselCardProduct product={product} />
                                </div>
                            </CarouselItem>
                        );
                    })
                }
            </CarouselContent>
        </Carousel>
    );
}

export default CarouselProducts;