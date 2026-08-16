'use client';

import { useState } from 'react';
import { BentoCategories } from '@/components/home/BentoCategories';
import { ComboSetsSection } from '@/components/home/ComboSetsSection';
import { DailySeafoodStory } from '@/components/home/DailySeafoodStory';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HeroSection } from '@/components/home/HeroSection';
import { HomePageEmpty } from '@/components/home/HomePageEmpty';
import { HomePageError } from '@/components/home/HomePageError';
import { HomePageSkeleton } from '@/components/home/HomePageSkeleton';
import { MarqueeStrip } from '@/components/home/MarqueeStrip';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { UspSection } from '@/components/home/UspSection';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { useHomeQuery } from '@/libs/queries/home';
import type { HomePageData } from '@/types/home';

type HomePageContentProps = {
  data?: HomePageData | null;
};

export function HomePageContent(props: HomePageContentProps) {
  const { data: initialData } = props;
  const { data: homeData, isLoading, isError, error, refetch } = useHomeQuery(initialData);

  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);

  // 1. Loading State
  if (isLoading && !homeData) {
    return <HomePageSkeleton />;
  }

  // 2. Error State
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

  // 3. Empty State (When API returns empty or no slides/products)
  const hasContent =
    homeData &&
    ((homeData.heroSlides && homeData.heroSlides.length > 0) ||
      (homeData.featuredProducts && homeData.featuredProducts.length > 0) ||
      (homeData.categories && homeData.categories.length > 0) ||
      (homeData.dailyArrivals && homeData.dailyArrivals.length > 0));

  if (!hasContent) {
    return (
      <HomePageEmpty
        onRefresh={() => {
          void refetch();
        }}
      />
    );
  }

  const handleOpenQuickView = (product: {
    id: string | number;
    name: string;
    price: number;
    image?: string;
    badges?: string[];
    spec?: string;
  }) => {
    setQuickViewProduct({
      id: String(product.id),
      name: product.name,
      badge: product.badges?.[0] ?? 'CẢNG PHAN THIẾT',
      price: `${product.price.toLocaleString('vi-VN')}₫`,
      originalPrice: `${Math.round(product.price * 1.15).toLocaleString('vi-VN')}₫`,
      rating: 4.9,
      reviewsCount: 42,
      origin: 'Cảng cá Phan Thiết, Bình Thuận',
      description:
        'Hải sản tươi bơi bể, tuyển chọn loại 1 từ đánh bắt rạng sáng. Cam kết 1 đổi 1 nếu không đạt chất lượng tươi sống.',
      image: product.image ?? '',
      weights: ['500g / Khay', '1kg / Túi oxy', 'Combo 2kg'],
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 1. Hero Section */}
      <HeroSection slides={homeData.heroSlides} />

      {/* 2. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. USP Section */}
      <UspSection />

      {/* 4. Bento Grid Categories */}
      <BentoCategories categories={homeData.categories} />

      {/* 5. Daily Arrivals */}
      <DailySeafoodStory arrivals={homeData.dailyArrivals} />

      {/* 6. Featured Products with Tabs */}
      <FeaturedProducts
        products={homeData.featuredProducts}
        tabs={homeData.featuredProductTabs}
        onQuickView={handleOpenQuickView}
      />

      {/* 7. Combo Sets */}
      <ComboSetsSection combos={homeData.comboSets} />

      {/* 8. Social Proof Reviews */}
      <SocialProofSection reviews={homeData.featuredReviews} />

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
