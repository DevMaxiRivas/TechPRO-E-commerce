import { ProductFilters } from "@/lib/filters/product-filter";
import { query } from "@/lib/strapi";
import getFieldsQuery from "./get-fields-query";

export function getProductsByFilter(filter: ProductFilters) {

    const { origin, state, category, priceMin, priceMax, isFeatured, page } = filter;
    let queryFilter = ``;

    if (origin !== undefined) {
        queryFilter += `filters[origin][$eq]=${origin}&`;
    }

    if (category !== undefined) {
        queryFilter += `filters[category][slug][$eq]=${category}&`;
    }

    if (priceMin !== undefined) {
        queryFilter += `filters[price][$gte]=${priceMin}&`;
    }

    if (priceMax !== undefined) {
        queryFilter += `filters[price][$lte]=${priceMax}&`;
    }

    if (state !== undefined) {
        queryFilter += `filters[state][$eq]=${state}&`;
    }

    if (isFeatured !== undefined) {
        queryFilter += `filters[isFeatured]=${isFeatured}&`;
    }

    const queryParams = `${queryFilter}&${getFieldsQuery()}`;

    return query(`products?${queryParams}`)
        .then(res => {
            return res.data
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            throw err;
        });
}