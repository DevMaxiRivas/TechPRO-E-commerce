import { z } from 'zod';

const ProductImageSchema = z.object({
    id: z.number(),
    url: z.string(),
});

const CategorySchema = z.object({
    id: z.number(),
    categoryName: z.string(),
    slug: z.string(),
});

export const ProductSchema = z.object({
    id: z.number(),
    productName: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.number(),
    state: z.string(),
    isFeatured: z.boolean(),
    images: z.array(ProductImageSchema),
    category: CategorySchema,
});

export const ProductsArraySchema = z.array(ProductSchema);

export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    price: number;
    state: string;
    isFeatured: boolean;
    images: Array<{
        id: number
        url: string
    }>
    category: {
        id: number;
        categoryName: string;
        slug: string;
    }
}

export const ProductTypeFields = [
    "id",
    "productName",
    "slug",
    "description",
    "price",
    "state",
    "isFeatured",
]

export const ProductTypeRelations = [
    { name: "images", fields: ["id", "url"] },
    { name: "category", fields: ["id", "categoryName", "slug"] }
]
