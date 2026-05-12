import { buildQueryFieldParameters, RelationFieldsType } from "@/lib/strapi";

export default function getFieldsQuery(fields: Array<string>, relations: Array<RelationFieldsType> | null) {
    return buildQueryFieldParameters(fields, relations);
}