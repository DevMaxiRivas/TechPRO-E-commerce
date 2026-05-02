import { getSchemaProducts } from "@/services/products/get-schema";

export const FilterOrigin = async () => {
    const schema = await getSchemaProducts();
    return (
        <div>
            <p>{schema.attributes.origin.enum.join(", ")}</p>
        </div>
    );
}