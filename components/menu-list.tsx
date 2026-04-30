"use client"

import * as React from "react"
import Link from "next/link"
import {
    CircleQuestionMark,
    Contact,
    Van,
} from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Notebooks",
        href: "/products?category=58",
        description:
            "A notebook is a small, thin book-like device that is used for writing, drawing, or taking notes.",
    },
    {
        title: "Tablets",
        href: "/products?category=59",
        description: "A tablet is a portable computer that typically has a touchscreen interface and is larger than a smartphone but smaller than a laptop.",
    },
    {
        title: "Smartphones",
        href: "/products?category=60",
        description: "A smartphone is a handheld electronic device that combines a computer, camera, and communication features in a single device.",
    },
]

const NavigationMenuDemo = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>About us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="w-96">
                            <li className="row-span-3">
                                <NavigationMenuLink render={<Link href="/" className="flex h-full w-full select-none flex-col justify-end">
                                    <div>
                                        <div className="mb-2 mt-2 text-lg font-medium">TechPRO</div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Electronic E-Commerce is your one-stop online shop for all things tech. We offer a wide range of electronic products, from the latest gadgets to essential accessories, all at competitive prices. Our user-friendly platform ensures a seamless shopping experience, while our dedicated customer support team is always ready to assist you. Shop with confidence and discover the best deals on top-quality electronics today!
                                        </p>
                                    </div>
                                </Link>} />
                            </li>
                            <ListItem href="/shop" title="Shop">
                                Explore our wide range of products and find the perfect items for you.
                            </ListItem>
                            <ListItem href="/offers" title="Offers">
                                Get up to 30% off on selected items. Do not miss out on our exclusive deals and discounts.
                            </ListItem>
                            <ListItem href="/best-sellers" title="Best Sellers">
                                Discover our best-selling products that customers love. Find out why they are so popular and get yours today.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger>Devices</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Help</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-50">
                            <li>
                                <NavigationMenuLink render={<Link href="/faq" className="flex-row items-center gap-2"><CircleQuestionMark />FAQ</Link>} />
                                <NavigationMenuLink render={<Link href="/contact" className="flex-row items-center gap-2"><Contact />Contact</Link>} />
                                <NavigationMenuLink render={<Link href="/returns" className="flex-row items-center gap-2"><Van />Returns</Link>} />
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/build-pc">Build pc</Link>} />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>
                <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div></Link>} />
        </li>
    )
}

export default NavigationMenuDemo