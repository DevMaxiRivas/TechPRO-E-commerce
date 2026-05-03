"use client";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

const ActionButtonsProduct = (props: { product: ProductType }) => {
    const { product } = props;
    return (
        <div className="grid grid-cols-7 grid-rows-1 items-center">
            <div className="col-span-6">
                <Button
                    className="w-full cursor-pointer hover:bg-black/80"
                    onClick={() => console.log("Buy " + product.productName)}
                >
                    Buy Now
                </Button>
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