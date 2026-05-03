import SkeletonSchema from "@/components/skeleton-schema";
import { getProductsBySlug } from "@/services/products/get-product-by-slug";
import { Suspense } from "react";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default async function page(
    { params }: { params: { productSlug: string } }
) {
    const { productSlug } = await params;
    const product = await getProductsBySlug(productSlug);
    return (
        <Suspense
            key={JSON.stringify(product)}
            fallback={
                <SkeletonProduct />
            }
        >
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                <div className="grid sm:grid-cols-2">
                    <div>
                        <CarouselProduct images={product.images} />
                    </div>
                    <div className="sm:px-12">
                        <InfoProduct product={product} />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}