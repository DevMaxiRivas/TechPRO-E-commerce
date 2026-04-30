import type { Metadata } from "next";
import { Urbanist, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechPRO - Your Ultimate Tech E-Commerce Destination",
  description: "Welcome to TechPRO, your one-stop shop for all things tech. Shop with confidence on our website! Explore a wide range of products, from electronics to fashion, all in one place. Enjoy seamless shopping with secure payments and fast delivery. Happy shopping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
        <body className={urbanist.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}