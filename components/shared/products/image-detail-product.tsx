import { getURLImage } from "@/lib/get-url-image";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ImageDetailProduct = (props: { slug: string, url: string }) => {
    const { url, slug } = props;
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/products/${slug}`)} className="cursor-pointer">
            <Image
                src={getURLImage(url)}
                width={500}
                height={500}
                alt="Image Product"
                loading="eager"
                className="h-24 w-24 object-contain overflow-hidden rounded-md"
            />
        </div>
    );
}

export default ImageDetailProduct;