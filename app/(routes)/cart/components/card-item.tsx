"use client";
import ImageDetailProduct from "@/components/shared/products/image-detail-product";
import TagsProduct from "@/components/shared/products/tags-product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";

const CardItem = (props: { product: ProductType }) => {
    const { product } = props;
    const { removeItem } = useCart();
    return (
        <li className="flex py-6 border-b">
            <ImageDetailProduct slug={product.slug} url={product.images[0].url} />
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{product.productName}</h2>
                    <p className="font-bold">{formatPrice(product.price)}</p>
                    <TagsProduct product={product} />
                </div>
                <div>
                    <Button
                        className={cn("rounded-full flex items-center justify-center text-black bg-white border shadow-md p-1 hover:scale-110 transition")}
                        onClick={() => removeItem(product.id)}
                    >
                        <X size={20} />
                    </Button>
                </div>
            </div>
        </li>
    );
}

export default CardItem;