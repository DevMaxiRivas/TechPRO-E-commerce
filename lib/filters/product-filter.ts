// lib/filters/product-filters.ts

import { z } from "zod";

export const productFiltersSchema = z.object({
    origin: z.string().optional(),
    state: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    priceMin: z.coerce.number().min(0).optional(),
    priceMax: z.coerce.number().min(0).optional(),
    inStock: z.coerce.boolean().optional(),
    isFeatured: z.stringbool({
        truthy: ["true"],
        falsy: ["false"],
    }).optional(),
    page: z.coerce.number().min(1).default(1),
});

export type ProductFilters = z.infer<typeof productFiltersSchema>;

// Parsea y valida los searchParams de Next.js de una sola vez
export function parseProductFilters(
    searchParams: Record<string, string | string[] | undefined>
): ProductFilters {
    return productFiltersSchema.parse(searchParams);
}