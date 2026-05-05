import { NotFoundError, ServiceUnavailableError } from "@/lib/errors";
import { query } from "@/lib/strapi";
import { ProductType } from "@/types/product";
import getFieldsQuery from "./get-fields-query";

export function getProductsBySlug(slug: string) {

    return query(`products?filters[slug][$eq]=${slug}&${getFieldsQuery()}`)
        .then(
            (res) => {
                if (res.data === undefined || res.data.length === 0) {
                    throw new NotFoundError("Product");
                }

                return res.data[0] as ProductType;
            }
        )
        .catch((err) => {
            if (err instanceof NotFoundError) throw err;
            throw new ServiceUnavailableError("API Backend", { cause: err });
        });
}