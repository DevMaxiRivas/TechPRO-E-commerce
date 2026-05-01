export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    price: number;
    isFeatured: boolean;
    images: Array<{
        url: string
    }>
    category: {
        id: number;
        categoryName: string;
        slug: string;
    }
}