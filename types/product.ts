export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    active: boolean;
    price: number;
    origin: string;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: Array<{
        url: string
    }>
    category: {
        id: number;
        categoryName: string;
        slug: string;
    }
}