import { query } from "@/lib/strapi";
import { CategoryType } from "@/types/category";
import { notFound } from "next/navigation";

export function getCategory(slug: string) {
    return query(`categories?filters[slug][$eq]=${slug}&fields=id,categoryName,slug&populate[mainImage][fields][0]=url`)
        .then(res => {
            if (res.data.length === 0) {
                notFound();
            }

            return res.data[0] as CategoryType;
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            throw err;
        });
}