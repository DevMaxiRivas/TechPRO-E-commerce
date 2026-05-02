"use client";
import { ProductType } from "@/types/product";
import ProductCard from "./product-card";
import { useGetCategoryProductsById } from "@/api/useGetCategoryProductsById";
import SkeletonSchema from "@/components/skeleton-schema";
import { ResponseType } from "@/types/response";

interface GridCardProductsProps {
    categoryId: number;
}

const ProductCardGrid = ({ categoryId }: GridCardProductsProps) => {
    const { result, loading }: ResponseType = useGetCategoryProductsById(categoryId);
    return (
        < div className="grid gap-5 mt-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {loading ?
                <SkeletonSchema grid={6} />
                : result.map((product: ProductType) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div >
    );
}

export default ProductCardGrid;