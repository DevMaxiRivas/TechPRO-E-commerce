import { query } from "@/lib/strapi";
import getFieldsQuery from "./get-fields-query";
import { ProductsArraySchema } from "@/types/product";
import { z } from "zod";

export function getProductsFeatured() {
    const queryParams = `filters[isFeatured][$eq]=true&${getFieldsQuery()}`;

    return query(`products?${queryParams}`)
        .then(res => {
            const validatedData = ProductsArraySchema.parse(res.data);
            return validatedData;
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