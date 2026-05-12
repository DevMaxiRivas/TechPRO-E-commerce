import { query } from "@/lib/strapi";
import getFieldsQuery from "../products/get-fields-query";
import { z } from "zod";
import { CategoriesArraySchema, CategoryTypeFields, CategoryTypeRelations } from "@/types/category";

export function getCategories() {
    return query(`categories?${getFieldsQuery(CategoryTypeFields, CategoryTypeRelations)}`)
        .then(res => {
            return CategoriesArraySchema.parse(res.data);
        })
        .catch((err) => {
            if (err instanceof z.ZodError) {
                console.error("Validation error:", err.issues);
                throw new Error("Invalid data structure from API");
            }
            console.error("Error fetching products:", err);
            throw err;
        });
}