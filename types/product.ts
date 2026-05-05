export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    price: number;
    state: string;
    isFeatured: boolean;
    images: Array<{
        id: number
        url: string
    }>
    category: {
        id: number;
        categoryName: string;
        slug: string;
    }
}

export const ProductTypeFields = [
    "id",
    "productName",
    "slug",
    "description",
    "price",
    "state",
    "isFeatured",
]

export const ProductTypeRelations = [
    { name: "images", fields: ["id", "url"] },
    { name: "category", fields: ["id", "categoryName", "slug"] }
]
