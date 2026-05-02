import { query } from "@/lib/strapi";

export function getSchemaProducts() {
    return query("content-type-builder/content-types/api::product.product", "getSchemas")
        .then(res => {
            return res.data.schema
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            throw err;
        });
}