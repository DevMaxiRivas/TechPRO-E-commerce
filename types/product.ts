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