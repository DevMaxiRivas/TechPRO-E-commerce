import BannerDiscount from "@/components/banner-discount";
import BannerProducts from "@/components/banner-products";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeatureProducts from "@/components/feature-products";

export default async function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeatureProducts />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProducts />
    </main>
  );
}
