import getFieldsQuery from "@/services/products/get-fields-query";
import { useGetResourcesFromAPI } from "./useGetResourcesFromAPI";

export function useGetFeatureProducts() {
    const query = `?filters[isFeatured][$eq]=true&${getFieldsQuery()}`;
    return useGetResourcesFromAPI("products", query);
}