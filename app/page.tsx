import BannerDiscount from "@/components/banner-discount";
import BannerProducts from "@/components/banner-products";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import { FeaturedProducts } from "@/components/featured-products";

export default async function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProducts />
    </main>
  );
}
