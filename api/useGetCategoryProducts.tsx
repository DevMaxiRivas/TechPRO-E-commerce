import { useGetResourcesFromAPI } from "./useGetResourcesFromAPI";

export function useGetCategoryProducts(slug: string) {
    const query = `?filters[category][slug][$eq]=${slug}&fields=id,productName,slug,description,price,isFeatured&populate[images][fields][0]=url&populate[category][fields]=categoryName,slug`;
    return useGetResourcesFromAPI("products", query);
}