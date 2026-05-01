import { query } from "@/lib/strapi";
import { useGetResourcesFromAPI } from "./useGetResourcesFromAPI";

export function useGetCategories() {
    const query = "fields=categoryName,slug&populate[mainImage][fields][0]=url";
    return useGetResourcesFromAPI("categories", query);
}