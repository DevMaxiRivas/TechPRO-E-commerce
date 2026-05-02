import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "@/components/icon-button";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { formatPrice } from "@/lib/format-price";
import { getURLImage } from "@/lib/get-url-image";

import { ProductType } from "@/types/product";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

type ProductCardProps = {
    product: ProductType;
}

const ProductCard = (props: ProductCardProps) => {
    const router = useRouter();
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
                                        <IconButton
                                            onClick={() => router.push(`product/${product.slug}`)}
                                            icon={<Expand size={20} />}
                                            className="text-primary"
                                        />
                                        <IconButton
                                            onClick={() => console.log("Add to cart:", product.productName)}
                                            icon={<ShoppingCart size={20} />}
                                            className="text-primary"
                                        />
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
                    <div className="flex justify-between">
                        <span className="capitalize px-2 py-1 rounded-full bg-primary text-white">{product.category.categoryName}</span>
                        <span className="px-2 py-1 text-black">{formatPrice(product.price)}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium dark:text-black">{product.productName}</h3>
                </div>
            </Link>
        </Card>

    );
}

export default ProductCard;