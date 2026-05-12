import z from "zod";

export type CategoryType = {
    id: number;
    categoryName: string;
    slug: string;
    mainImage: {
        url: string
    }
}

export const CategoryTypeFields = ["id", "categoryName", "slug"];
export const CategoryTypeRelations = [{ name: "mainImage", fields: ["url"] }]

export const CategorySchema = z.object({
    id: z.number(),
    categoryName: z.string(),
    slug: z.string(),
    mainImage: z.object({
        url: z.string()
    })
});

export const CategoriesArraySchema = z.array(CategorySchema);