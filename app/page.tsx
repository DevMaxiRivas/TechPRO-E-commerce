import SectionBannerProducts from "@/components/section-banner-products";
import SectionBannerDiscount from "@/components/section-banner-discount";
import SectionCarouselTextBanner from "@/components/section-carousel-text-banner";
import SectionChooseCategory from "@/components/section-choose-category";
import { SectionFeaturedProducts } from "@/components/section-featured-products";

export default async function Home() {
  return (
    <main>
      <SectionCarouselTextBanner />
      <SectionFeaturedProducts />
      <SectionBannerDiscount />
      <SectionChooseCategory />
      <SectionBannerProducts />
    </main>
  );
}
