import { ProductType } from "@/types/product";
import { getProductsByFilter } from "@/services/products/get-products-by-filter";
import ProductCard from "./product-card";
import { ProductFilters } from "@/lib/filters/product-filter";

interface FilterProductType {
    categoryId: number | undefined;
    categorySlug: string | undefined;
    minPrice: number | undefined;
    maxPrice: number | undefined;
    search: string | undefined;
    state: string | undefined;
}

export default async function ProductList({ filters }: { filters: ProductFilters }) {
    const products = await getProductsByFilter(filters);
    return (
        <>
            {
                products.map((product: ProductType) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </>
    );
}
