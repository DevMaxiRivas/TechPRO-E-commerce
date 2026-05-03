import { NotFoundError, ServiceUnavailableError } from "@/lib/errors";
import { query } from "@/lib/strapi";
import { ProductType } from "@/types/product";

export function getProductsBySlug(slug: string) {
    return query(`products?filters[slug][$eq]=${slug}&fields=id,productName,state,slug,description,price,isFeatured&populate[images][fields][0]=url&populate[category][fields]=categoryName,slug`)
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