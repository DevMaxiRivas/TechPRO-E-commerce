"use client";

import { useGetCategories } from "@/api/useGetCategories";
import { getURLImage } from "@/lib/get-url-image";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Image from "next/image";
import Link from "next/link";
import SkeletonSchema from "./skeleton-schema";
import { Skeleton } from "./ui/skeleton";

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategories();

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Choose your favorite category</h3>
            <div className="grid gap-5 sm:grid-cols-3">
                {loading ? (

                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="p-2 mx-auto">
                            <Skeleton className="h-[270px] w-[270px] rounded-xl" />
                        </div>
                    ))

                ) : (
                    result.map((category: CategoryType) => (
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