import FiltersControlsCategory from "./components/filters-controls-category";
import { Separator } from "@/components/ui/separator";
import { FilterOrigin } from "./components/filter-origin";
import { getCategory } from "@/services/category/get-category";

export default async function categoryPage(
    { params }: { params: { categorySlug: string } }

) {
    const { categorySlug } = await params;
    const category = await getCategory(categorySlug);
    // console.log(category);
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h1 className="text-3xl font-medium capitalize">{category.categoryName}</h1>
            <Separator className="my-4" />
            <div className="sm:flex sm:justify-between">
                <FiltersControlsCategory>
                    <FilterOrigin />
                </FiltersControlsCategory>
            </div>
        </div>
    );
}