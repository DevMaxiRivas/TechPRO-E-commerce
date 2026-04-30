import CarouselTextBanner from "@/components/carousel-text-banner";
import FeatureProducts from "@/components/feature-products";

export default async function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeatureProducts />
    </main>
  );
}
