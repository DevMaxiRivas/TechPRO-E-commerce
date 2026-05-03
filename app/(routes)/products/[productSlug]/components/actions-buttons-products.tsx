"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ProductType } from "@/types/product";
import { Heart, ShoppingCart } from "lucide-react";

const ActionButtonsProduct = (props: { product: ProductType }) => {
    const { product } = props;
    const { addItem } = useCart();

    return (
        <div className="grid grid-cols-7 grid-rows-2 items-center">
            <div className="col-span-5">
                <Button
                    className="w-full cursor-pointer hover:bg-black/80"
                    onClick={() => console.log("Buy " + product.productName)}
                >
                    Buy Now
                </Button>
            </div>
            <div className="col-start-6">
                <ShoppingCart
                    width={30}
                    strokeWidth={1}
                    className="mx-auto transition duration-300 cursor-pointer hover:fill-black"
                    onClick={() => addItem(product)}
                />
            </div>
            <div className="col-start-7">
                <Heart
                    width={30}
                    strokeWidth={1}
                    className="mx-auto transition duration-300 cursor-pointer hover:fill-black"
                    onClick={() => console.log("Add to favorites product " + product.productName)}
                />
            </div>
        </div>
    );
}

export default ActionButtonsProduct;