import { Expand, ShoppingCart } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { formatPrice } from "@/lib/format-price";
import { getURLImage } from "@/lib/get-url-image";

import { ProductType } from "@/types/product";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import TagsProduct from "@/components/shared/products/tags-product";

type ProductCardProps = {
    product: ProductType;
}

const ProductCard = (props: ProductCardProps) => {
    const { product } = props
    return (
        <Card className="h-full py-4 border border-gray-200 shadow-none bg-white relative transition-all duration-100 rounded-lg hover:shadow-md">
            <CardContent className="relative flex items-center justify-center px-6 py-2">
                <Carousel
                    opts={{
                        align: "start"
                    }}
                    className="w-full max-w-sm"
                >
                    <CarouselContent>
                        {product.images.map((image) => (
                            <CarouselItem
                                key={image.id}
                                className="group"
                            >
                                <Image
                                    src={getURLImage(image.url)}
                                    width={500}
                                    height={500}
                                    alt="Image Featured"
                                    loading="eager"
                                    className="h-48 w-96 object-contain"
                                />
                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                    <div className="flex justify-center gap-x-6">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="rounded-full flex items-center bg-white border shadow-md p-2 hover:scale-110 transition text-primary"
                                        >
                                            <Expand size={20} />
                                        </Link>
                                        <Link
                                            href={`/cart`}
                                            className="rounded-full flex items-center bg-white border shadow-md p-2 hover:scale-110 transition text-primary"
                                        >
                                            <ShoppingCart size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </CardContent>
            <Link
                href={`/products/${props.product.slug}`}
            >
                <div className="px-8">
                    <TagsProduct product={product} />
                    <h3 className="mt-2 text-lg font-medium dark:text-black">{product.productName}</h3>
                    <p className="font-bold text-lg dark:text-primary">{formatPrice(product.price)}</p>
                </div>
            </Link>
        </Card>

    );
}

export default ProductCard;