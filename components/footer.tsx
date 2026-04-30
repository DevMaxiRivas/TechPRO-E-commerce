import Link from "next/link";
import { Separator } from "./ui/separator";

const dataFooter = [
    {
        id: 1,
        name: "About Us",
        link: "/about"
    },
    {
        id: 2,
        name: "Products",
        link: "/products"
    },
    {
        id: 3,
        name: "My Account",
        link: "/account"
    },
    {
        id: 4,
        name: "Privacy Policy",
        link: "/privacy"
    },
]
const Footer = () => {
    return (
        <footer className="mt-4">
            <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <p>
                        Tech
                        <span className="font-bold text-gray-800 dark:text-white">
                            PRO
                        </span>
                    </p>
                    <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-white">
                        {dataFooter.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.link}
                                    className="hover:underline me-4 md:me-6">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    &copy; {new Date().getFullYear()}
                    <Link href="https://portafolio.devmaxirivas.cloud/" className="hover:underline"> DevMaxiRivas</Link> All rights reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;