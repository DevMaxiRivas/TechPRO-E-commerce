import SkeletonSchema from "@/components/skeleton-schema";
import { Separator } from "@/components/ui/separator";
import { getSchemaProducts } from "@/services/products/get-schema";
import { Suspense } from "react";
import ProductCardList from "./components/product-card-list";
import StateFilter from "./components/state-filter";
import { parseProductFilters } from "@/lib/filters/product-filter";
import OriginFilter from "./components/origin-filter";
import IsFeaturedFilter from "./components/is-featured-filter";

export default async function page(
    { searchParams }: { searchParams: Record<string, string | undefined>; }

) {
    const schema = await getSchemaProducts();
    const filters = parseProductFilters(await searchParams);

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h1 className="text-3xl font-medium capitalize p-3">Products</h1>
            <Separator className="my-1" />
            <div className="flex flex-col md:flex-row">
                <aside className="mr-10">
                    <StateFilter options={schema.attributes.state.enum} />
                    <OriginFilter options={schema.attributes.origin.enum} />
                    <IsFeaturedFilter />
                </aside>
                <section>
                    < div className="grid gap-5 mt-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
                        <Suspense
                            key={JSON.stringify(filters)}
                            fallback={
                                <SkeletonSchema grid={6} />
                            }
                        >
                            <ProductCardList filters={filters} />
                        </Suspense>
                    </div>
                </section>
            </div>
        </div >
    );
}