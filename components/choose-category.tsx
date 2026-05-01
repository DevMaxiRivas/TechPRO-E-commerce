"use client";

import { useGetCategories } from "@/api/useGetCategories";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Image from "next/image";
import Link from "next/link";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategories();

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Choose your favorite category</h3>

            <div className="grid gap-5 sm:grid-cols-3">
                {loading ? (
                    <p>Loading categories...</p>
                ) : (
                    result.map((category: CategoryType) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="h-full relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                        >
                            <div className="flex items-center justify-center h-full">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage?.url}`}
                                    width={500}
                                    height={500}
                                    alt={category.categoryName}
                                    loading="eager"
                                    // className="h-48 w-96 object-contain"
                                    className="max-w-[270px] object-contain transition duration-300 ease-in-out rounded-lg hover:scale-110"
                                />
                            </div>
                            <p className="absolute w-full py-2 text-lg font-bold text-center capitalize text-white bottom-5 backdrop-blur-lg">
                                {category.categoryName}
                            </p>
                        </Link>
                    )
                    ))}
            </div>
        </div>
    );
}

export default ChooseCategory;