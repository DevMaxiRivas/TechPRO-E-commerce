import { useGetResourcesFromAPI } from "./useGetResourcesFromAPI";

export function useFilterOrigin() {
    const query = "?filters[isFeatured][$eq]=true&fields=id,productName,slug,description,price,isFeatured&populate[images][fields][0]=url&populate[category][fields]=categoryName,slug";
    return useGetResourcesFromAPI("products", query);
}