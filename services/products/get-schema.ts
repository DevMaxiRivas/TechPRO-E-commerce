import { AppError, NotFoundError, ServiceUnavailableError } from "@/lib/errors";
import { query } from "@/lib/strapi";
import { ProductSchema } from "@/types/productSchema";

export function getSchemaProducts() {
    return query("content-type-builder/content-types/api::product.product?fields=schema", "getSchemas")
        .then(res => {

            if (res.error) {
                throw new NotFoundError("Schema Products", { cause: res.error });
            }

            return res.data.schema as ProductSchema
        })
        .catch((err) => {
            if (err instanceof AppError) throw err;
            throw new ServiceUnavailableError("API Backend Schema", { cause: err });
        });
}