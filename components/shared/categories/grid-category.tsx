import { getURLImage } from "@/lib/get-url-image";
import { getCategories } from "@/services/category/get-categories";
import { CategoryType } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

export async function GridCategory() {
    const categories = await getCategories()

    return (
        <div className="grid gap-5 sm:grid-cols-3">
            {
                categories.map((category: CategoryType) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.slug}`}
                        className="h-full relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                    >
                        <div className="flex items-center justify-center h-full">
                            <Image
                                src={getURLImage(category.mainImage.url)}
                                width={500}
                                height={500}
                                alt={category.categoryName}
                                loading="eager"
                                className="max-w-68 object-contain transition duration-300 ease-in-out rounded-lg hover:scale-110"
                            />
                        </div>
                        <p className="absolute w-full py-2 text-lg font-bold text-center capitalize text-white bottom-5 backdrop-blur-lg">
                            {category.categoryName}
                        </p>
                    </Link>
                )
                )}
        </div>
    );
}

export default GridCategory;