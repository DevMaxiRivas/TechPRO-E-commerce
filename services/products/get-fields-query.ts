import { buildQueryFieldParameters } from "@/lib/strapi";
import { ProductTypeFields, ProductTypeRelations } from "@/types/product";

export default function getFieldsQuery() {
    return buildQueryFieldParameters(
        ProductTypeFields,
        ProductTypeRelations
    );
}