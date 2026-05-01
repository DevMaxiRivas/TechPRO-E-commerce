import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
    return (
        <div className="p-5 sm:p-20 text-center">
            <h2 className="uppercase font-black text-2xl text-primary">Save up to -25%</h2>
            <h3>-20% off when you spend $100. Use the code <b>TPRO04</b></h3>
            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <Link href="/products" className={buttonVariants()}>Shop Now</Link>
                <Link href="#" className={buttonVariants({ variant: "outline" })}>More Information</Link>
            </div>
        </div>
    );
}

export default BannerDiscount;