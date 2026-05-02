import FiltersControlsCategory from "./components/filters-controls-category";
import { Separator } from "@/components/ui/separator";
import { FilterOrigin } from "./components/filter-origin";
import { getCategory } from "@/services/category/get-category";
import ProductCardGrid from "./components/product-card-grid";

export default async function page(
    { params }: { params: { categorySlug: string } }

) {
    const { categorySlug } = await params;
    const category = await getCategory(categorySlug);
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h1 className="text-3xl font-medium capitalize p-3">{category.categoryName}</h1>
            <Separator className="my-1" />
            <div className="flex flex-col md:flex-row">
                <aside className="mr-10">
                    <FiltersControlsCategory>
                        <FilterOrigin />
                    </FiltersControlsCategory>
                </aside>
                <section>
                    <ProductCardGrid categoryId={category.id} />
                </section>
            </div>

        </div >
    );
}