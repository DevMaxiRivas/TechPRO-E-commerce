"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { getURLImage } from "@/lib/get-url-image";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TagsProduct from "./tags-product";
import IconButton from "@/components/icon-button";
import { useRouter } from "next/navigation";
import { truncate } from "@/lib/string-mapping";

const CarouselCardProduct = (props: { product: ProductType }) => {
    const { product } = props;
    const { addItem } = useCart();
    const router = useRouter();
    return (
        <Card className="h-full py-4 border border-gray-200 shadow-none bg-white">
            <CardContent className="relative flex items-center justify-center px-6 py-2">
                <Link
                    href={`products/${product.slug}`}
                >
                    <Image
                        src={getURLImage(product.images[0].url)}
                        width={500}
                        height={500}
                        alt="Image Featured"
                        loading="eager"
                        className="h-48 w-96 object-contain"
                    />
                </Link>
                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                    <div className="flex justify-center gap-x-6">
                        <IconButton
                            onClick={() => router.push(`products/${product.slug}`)}
                            icon={<Expand size={20} />}
                            className="text-primary cursor-pointer"
                        />
                        <IconButton
                            onClick={() => addItem(product)}
                            icon={<ShoppingCart size={20} />}
                            className="text-primary cursor-pointer"
                        />
                    </div>
                </div>
            </CardContent>
            <Link
                href={`products/${product.slug}`}
                className="px-8"
            >
                <TagsProduct product={product} />
                <h3 className="mt-2 text-lg font-medium dark:text-black">{truncate(product.productName, 70)}</h3>
                <p className="font-bold text-lg dark:text-primary">{formatPrice(product.price)}</p>
            </Link>
        </Card>
    );
}

export default CarouselCardProduct;