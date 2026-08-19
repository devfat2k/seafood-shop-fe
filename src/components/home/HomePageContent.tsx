"use client";

import { useState } from "react";
import { BentoCategories } from "@/components/home/BentoCategories";
import { ComboSetsSection } from "@/components/home/ComboSetsSection";
import { DailySeafoodStory } from "@/components/home/DailySeafoodStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { HomePageEmpty } from "@/components/home/HomePageEmpty";
import { HomePageError } from "@/components/home/HomePageError";
import { HomePageSkeleton } from "@/components/home/HomePageSkeleton";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { UspSection } from "@/components/home/UspSection";
import type { QuickViewProduct } from "@/components/products/QuickViewModal";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { useHomeQuery } from "@/libs/queries/home";
import type { HomePageData } from "@/types/home";

type HomePageContentProps = {
  data?: HomePageData | null;
};

type QuickViewInput = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  badges?: string[];
  spec?: string;
};

function mapToQuickView(p: QuickViewInput): QuickViewProduct {
  return {
    id: String(p.id),
    name: p.name,
    badge: p.badges?.[0] ?? "CẢNG PHAN THIẾT",
    price: `${p.price.toLocaleString("vi-VN")}₫`,
    originalPrice: `${Math.round(p.price * 1.15).toLocaleString("vi-VN")}₫`,
    rating: 4.9,
    reviewsCount: 42,
    origin: "Cảng cá Phan Thiết, Bình Thuận",
    description:
      "Hải sản tươi bơi bể, tuyển chọn loại 1 từ đánh bắt rạng sáng. Cam kết 1 đổi 1 nếu không đạt chất lượng tươi sống.",
    image: p.image ?? "",
    weights: ["500g / Khay", "1kg / Túi oxy", "Combo 2kg"],
  };
}

function checkHasContent(data?: HomePageData | null): boolean {
  if (!data) {
    return false;
  }
  return (
    (Boolean(data.heroSlides) && data.heroSlides.length > 0) ||
    (Boolean(data.featuredProducts) && data.featuredProducts.length > 0) ||
    (Boolean(data.categories) && data.categories.length > 0)
  );
}

export function HomePageContent(props: HomePageContentProps) {
  const { data: initialData } = props;
  const {
    data: homeData,
    isLoading,
    isError,
    error,
    refetch,
  } = useHomeQuery(initialData);
  const [quickViewProduct, setQuickViewProduct] =
    useState<QuickViewProduct | null>(null);

  if (isLoading && !homeData) {
    return <HomePageSkeleton />;
  }

  if (isError && !homeData) {
    return (
      <HomePageError
        message={error?.message}
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!checkHasContent(homeData) || !homeData) {
    return (
      <HomePageEmpty
        onRefresh={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero Section with Live Stats */}
      <HeroSection slides={homeData.heroSlides} stats={homeData.stats} />

      {/* 2. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. USP Section */}
      <UspSection />

      {/* 4. Bento Grid 8 Categories */}
      {homeData.categories && homeData.categories.length > 0 && (
        <BentoCategories categories={homeData.categories} />
      )}

      {/* 5. Daily Seafood Arrivals (Conditional) */}
      {homeData.dailyArrivals && homeData.dailyArrivals.length > 0 && (
        <DailySeafoodStory arrivals={homeData.dailyArrivals} />
      )}

      {/* 6. Featured Products with Tabs */}
      {homeData.featuredProducts && homeData.featuredProducts.length > 0 && (
        <FeaturedProducts
          products={homeData.featuredProducts}
          tabs={homeData.featuredProductTabs}
          onQuickView={(p) => {
            setQuickViewProduct(mapToQuickView(p));
          }}
        />
      )}

      {/* 7. Combo Sets (Conditional) */}
      {homeData.comboSets && homeData.comboSets.length > 0 && (
        <ComboSetsSection combos={homeData.comboSets} />
      )}

      {/* 8. Social Proof Reviews (Conditional) */}
      {homeData.featuredReviews && homeData.featuredReviews.length > 0 && (
        <SocialProofSection reviews={homeData.featuredReviews} />
      )}

      {/* QUICK VIEW MODAL OVERLAY */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => {
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
}
