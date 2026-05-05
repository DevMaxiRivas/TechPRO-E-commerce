"use client";

import { useGetFeatureProducts } from "@/api/useGetFeatureProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeleton-schema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import Image from "next/image";
import { getURLImage } from "@/lib/get-url-image";
import { formatPrice } from "@/lib/format-price";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import TagsProduct from "./shared/products/tags-product";

const truncate = (str: string, len: number) => {
    return str.length > len ? str.slice(0, len) + '...' : str;
};

const FeatureProducts = () => {
    const { result, loading }: ResponseType = useGetFeatureProducts();
    const router = useRouter();
    const { addItem } = useCart();
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h2 className="px-6 text-3xl sm:pb-8">Featured Products</h2>
            <Carousel
            >
                <CarouselContent className="-ml-2 md:-ml-4 gap-4">
                    {(loading && (<SkeletonSchema grid={3} />))}
                    {
                        result !== null && result.map((product: ProductType) => {
                            const { id, productName, slug, price, images, category } = product;
                            return (
                                <CarouselItem key={id} className="flex flex-col md:basis-1/2 lg:basis-1/3 group">
                                    <div className="h-full p-1">
                                        <Card className="h-full py-4 border border-gray-200 shadow-none bg-white">
                                            <CardContent className="relative flex items-center justify-center px-6 py-2">
                                                <Image
                                                    src={getURLImage(images[0].url)}
                                                    width={500}
                                                    height={500}
                                                    alt="Image Featured"
                                                    loading="eager"
                                                    className="h-48 w-96 object-contain"
                                                />
                                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                                    <div className="flex justify-center gap-x-6">
                                                        <IconButton
                                                            onClick={() => router.push(`products/${slug}`)}
                                                            icon={<Expand size={20} />}
                                                            className="text-primary"
                                                        />
                                                        <IconButton
                                                            onClick={() => addItem(product)}
                                                            icon={<ShoppingCart size={20} />}
                                                            className="text-primary"
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <Link
                                                href={`products/${slug}`}
                                                className="px-8"
                                            >
                                                <TagsProduct product={product} />
                                                <h3 className="mt-2 text-lg font-medium dark:text-black">{truncate(productName, 70)}</h3>
                                                <p className="font-bold text-lg dark:text-primary">{formatPrice(product.price)}</p>
                                            </Link>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            );
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
}

export default FeatureProducts;
