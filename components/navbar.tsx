"use client"
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toogle-theme";
import { useCart } from "@/hooks/use-cart";
import { useBookmarks } from "@/hooks/use-bookmarks";

const Navbar = () => {
    const router = useRouter();
    const cart = useCart();
    const bookmarks = useBookmarks();
    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            <h1
                className="text-3xl"
                onClick={() => router.push("/")}
            >
                Tech
                <span className="font-bold">PRO</span>
            </h1>
            <div className="items-center hidden gap-4 sm:flex">
                {/* Menu Desktop */}
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                {/* Menu Mobile */}
                <ItemsMenuMobile />
            </div>
            <div className="flex items-center justify-between gap-2 sm:gap-7">
                {
                    cart.items.length === 0 ?
                        (<ShoppingCart
                            strokeWidth="1"
                            className="cursor-pointer"
                            onClick={() => router.push("/cart")}
                        />) :
                        (
                            <div
                                className="flex gap-1"
                                onClick={() => router.push("/cart")}
                            >
                                <BaggageClaim strokeWidth="1" className="cursor-pointer" />
                                <span>{cart.items.length}</span>
                            </div>
                        )
                }
                <Heart
                    strokeWidth="1"
                    className={`cursor-pointer ${bookmarks.items.length > 0 && "fill-black dark:fill-white"}`}
                    onClick={() => router.push("/bookmarks")}
                />
                <User
                    strokeWidth="1"
                    className="cursor-pointer"
                    onClick={() => router.push("/profile")}
                />
                <ToggleTheme />
            </div>
        </div>
    )
}

export default Navbar;