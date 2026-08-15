'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { ProductCard } from '@/components/products/ProductCard';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import type { FeaturedProductTab } from '@/types/home';

type FeaturedProductsProps = {
  products?: Product[];
  tabs?: FeaturedProductTab[];
  onQuickView?: (product: ProductCardItem) => void;
};

export function FeaturedProducts(props: FeaturedProductsProps) {
  const { products = [], tabs = [], onQuickView } = props;
  const [activeTab, setActiveTab] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) {
    return null;
  }

  const filteredProducts =
    activeTab === 'all' ? products : products.filter((p) => p.categorySlug === activeTab);

  const displayProducts: ProductCardItem[] = filteredProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.categoryName ?? 'Hải Sản',
    badges: p.featured ? ['Nổi bật', 'Tươi sống'] : ['Tươi sống'],
    spec: p.spec ?? 'Giao tươi dấp đá',
    price: p.price,
    unit: p.unit ?? '1kg',
    image: p.imageUrl ?? '',
  }));

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const activeTabsList =
    tabs.length > 0
      ? tabs
      : [
          { slug: 'all', label: 'Tất cả' },
          { slug: 'tom-cua', label: 'Tôm & Cua' },
          { slug: 'muc-bach-tuoc', label: 'Mực & Bạch tuộc' },
          { slug: 'sot-tiec', label: 'Sốt Tiệc' },
        ];

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#C4922F] uppercase">
              ĐƯỢC MUA NHIỀU NHẤT
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B2F28] sm:text-3xl lg:text-4xl">
              Hải Sản Tươi Sống Hôm Nay
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] p-1.5 shadow-xs">
              {activeTabsList.map((tab) => (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.slug);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeTab === tab.slug
                      ? 'bg-[#0B2F28] text-white shadow-xs'
                      : 'text-[#5B6B63] hover:text-[#0B2F28]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Prev / Next Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleScroll('left');
                }}
                aria-label="Cuộn trái danh sách sản phẩm"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E0D8] bg-white text-[#0B2F28] shadow-xs transition-all hover:scale-105 hover:bg-[#F5F1E8] active:scale-95"
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleScroll('right');
                }}
                aria-label="Cuộn phải danh sách sản phẩm"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E0D8] bg-white text-[#0B2F28] shadow-xs transition-all hover:scale-105 hover:bg-[#F5F1E8] active:scale-95"
              >
                <Icon name="chevron-right" size="sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid Container */}
        <div
          ref={scrollContainerRef}
          className="mt-8 flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-[calc(25%-18px)]"
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/products"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-10 py-3.5 text-xs font-bold text-[#0B2F28] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#E4EEEA] hover:text-[#0B2F28]"
          >
            <span>Xem Tất Cả Sản Phẩm</span>
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
