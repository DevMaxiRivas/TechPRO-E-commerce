import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProducts = () => {
    return (
        <>
            <div className="mt-4 text-center">
                <p>Unlock your full gaming potential...</p>
                <h4 className="mt-2 text-5xl font-extrabold text-primary">TechPRO</h4>
                <p className="my-2 text-lg">Units armed and ready for action!</p>
                <Link
                    className={buttonVariants()}
                    href="/products"
                >
                    Shop Now
                </Link>
            </div>
            <div className="h-[350px] bg-cover lg:h-[600px] bg-[url('/slider-image.jpg')] bg-center mt-5"></div>
        </>
    );
}

export default BannerProducts;