import { getProductsFeatured } from "@/services/products/get-products-featured";
import CarouselProducts from "./shared/products/carousel-products";

export async function FeaturedProducts() {
    const products = await getProductsFeatured();
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h2 className="px-6 text-3xl sm:pb-8">Featured Products</h2>
            <CarouselProducts products={products} />
        </div>
    );
}