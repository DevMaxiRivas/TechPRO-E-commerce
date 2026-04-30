import { query } from "@/lib/strapi";

export function getProducts() {
    return query("products")
        .then(res => {
            console.log(res);
            return res
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            throw err;
        });
}