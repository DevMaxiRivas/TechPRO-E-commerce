"use client";

import { ProductFilters } from "@/lib/filters/product-filter";
import { useRouter, useSearchParams } from "next/navigation";

export function useProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function updateFilter<K extends keyof ProductFilters>(
        key: K,
        value: ProductFilters[K] | undefined
    ) {
        const params = new URLSearchParams(searchParams.toString());

        if (value === undefined || value === "") {
            params.delete(key);
        } else {
            params.set(key, String(value));
        }

        // Resetear página al cambiar cualquier filtro
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }

    function clearFilters() {
        router.push("?");
    }

    return { updateFilter, clearFilters, searchParams };
}