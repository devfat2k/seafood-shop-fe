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
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { UspSection } from '@/components/home/UspSection';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { useHomeQuery } from '@/libs/queries/home';
import { useCartStore } from '@/libs/stores/cart';
import type { HomePageData } from '@/types/home';
import { formatCurrency } from '@/utils/Helpers';

type HomePageContentProps = {
  data?: HomePageData | null;
};

type QuickViewInput = {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  badges?: string[];
  spec?: string;
  category?: string;
  origin?: string;
  description?: string;
  weights?: string[];
  featured?: boolean;
};

function mapToQuickView(p: QuickViewInput): QuickViewProduct {
  const badge = p.badges?.[0] ?? (p.featured ? 'NỔI BẬT' : 'TƯƠI SỐNG');
  return {
    id: String(p.id),
    name: p.name,
    badge,
    price: formatCurrency(p.price),
    rawPrice: p.price,
    originalPrice:
      p.originalPrice && p.originalPrice > p.price ? formatCurrency(p.originalPrice) : undefined,
    category: p.category,
    origin: p.origin ?? 'Cảng cá Phan Thiết, Bình Thuận',
    description:
      p.description ??
      p.spec ??
      'Hải sản tươi sống loại 1 được tuyển chọn trực tiếp tại cảng cá Phan Thiết, giao nhanh chuỗi lạnh 2H.',
    image: p.image ?? '',
    weights: p.weights && p.weights.length > 0 ? p.weights : ['500g', '1kg', 'Túi oxy sống'],
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
  const { data: homeData, isLoading, isError, error, refetch } = useHomeQuery(initialData);
  const { addItem, openCart } = useCartStore();
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);

  const handleAddToCart = (item: {
    id: string | number;
    name: string;
    price: number;
    image?: string;
    weight?: string;
    quantity?: number;
  }) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      weight: item.weight ?? 'Tiêu chuẩn',
      quantity: item.quantity ?? 1,
    });
    openCart();
  };

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
      <HeroSection slides={homeData.heroSlides} stats={homeData.stats} />

      {homeData.featuredProducts && homeData.featuredProducts.length > 0 && (
        <FeaturedProducts
          products={homeData.featuredProducts}
          tabs={homeData.featuredProductTabs}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => {
            setQuickViewProduct(mapToQuickView(p));
          }}
        />
      )}

      {homeData.comboSets && homeData.comboSets.length > 0 && (
        <ComboSetsSection combos={homeData.comboSets} onAddToCart={handleAddToCart} />
      )}

      {homeData.dailyArrivals && homeData.dailyArrivals.length > 0 && (
        <DailySeafoodStory arrivals={homeData.dailyArrivals} onAddToCart={handleAddToCart} />
      )}

      <UspSection />

      {homeData.categories && homeData.categories.length > 0 && (
        <BentoCategories categories={homeData.categories} />
      )}

      {homeData.featuredReviews && homeData.featuredReviews.length > 0 && (
        <SocialProofSection reviews={homeData.featuredReviews} />
      )}

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => {
          setQuickViewProduct(null);
        }}
        onAddToCart={(prod, weight, qty) => {
          handleAddToCart({
            id: prod.id,
            name: prod.name,
            price: prod.rawPrice ?? (Number(prod.price.replaceAll(/[^\d]/gu, '')) || 0),
            image: prod.image,
            weight,
            quantity: qty,
          });
        }}
      />
    </div>
  );
}
