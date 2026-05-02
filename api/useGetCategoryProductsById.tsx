import { useGetResourcesFromAPI } from "./useGetResourcesFromAPI";

export function useGetCategoryProductsById(id: number) {
    const query = `filters[category][id][$eq]=${id}&fields=id,productName,slug,description,price,isFeatured&populate[images][fields][0]=url&populate[category][fields]=categoryName,slug`;
    return useGetResourcesFromAPI("products", query);
}