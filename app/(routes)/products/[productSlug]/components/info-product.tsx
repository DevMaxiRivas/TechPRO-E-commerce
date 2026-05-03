import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import ActionButtonsProduct from "./actions-buttons-products";

export type InfoProductProps = {
    product: ProductType
}
const InfoProduct = (props: InfoProductProps) => {
    const { product } = props;
    return (
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl">
                    {product.productName}
                </h1>
                <div className="flex items-center justify-between gap-3">
                    <span className="capitalize px-2 py-1 rounded-full bg-primary text-white">{product.category.categoryName}</span>
                    <span className="capitalize px-2 py-1 rounded-full bg-secondary text-prymary">{product.state}</span>
                </div>
            </div>
            <Separator className="my-4" />
            <p>{product.description}</p>
            <Separator className="my-4" />
            <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
            <ActionButtonsProduct product={product} />
        </div>
    );
}

export default InfoProduct;