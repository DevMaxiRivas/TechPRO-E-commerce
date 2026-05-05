import { ProductType } from "@/types/product";

const TagsProduct = (props: { product: ProductType }) => {
    const { product } = props;
    return (
        <div className="flex items-center gap-3">
            <p className="capitalize px-2 py-1 text-white bg-black rounded-full dark:bg-black dark:text-white w-fit">
                {product.category.categoryName}
            </p>
            <p className="capitalize px-2 py-1 text-white bg-primary rounded-full w-fit">
                {product.state}
            </p>
        </div>
    );
}

export default TagsProduct;