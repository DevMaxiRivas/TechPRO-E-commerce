import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
    "/cart",
    // "/orders", 
    "/profile"
];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
    const jwt = request.cookies.get("jwt")?.value;
    const { pathname } = request.nextUrl;

    if (protectedRoutes.some(r => pathname.startsWith(r)) && !jwt) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authRoutes.includes(pathname) && jwt) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};