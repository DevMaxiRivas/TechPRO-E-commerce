import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href="/about">About Us</Link>
                <Link href="/help">Help</Link>
                <Link href="/build-pc">Build PC</Link>
            </PopoverContent>
        </Popover>
    );
}

export default ItemsMenuMobile;