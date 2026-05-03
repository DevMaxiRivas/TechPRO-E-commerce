import { ProductFilters } from "@/lib/filters/product-filter";
import { query } from "@/lib/strapi";

export function getProductsByFilter(filter: ProductFilters) {
    // const { categoryId, minPrice, maxPrice, search, state } = filter;

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

    const queryParams = `${queryFilter}fields=id,productName,slug,description,price,isFeatured&populate[images][fields][0]=url&populate[category][fields]=categoryName,slug`;
    // console.log(filter, "\n", queryParams);
    return query(`products?${queryParams}`)
        .then(res => {
            return res.data
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            throw err;
        });
}