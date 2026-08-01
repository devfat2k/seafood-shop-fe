'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { ProductCard } from '@/components/products/ProductCard';
import { FEATURED_PRODUCTS } from '@/data/home-mock';
import { Link } from '@/libs/I18nNavigation';

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProducts =
    activeTab === 'all'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.categorySlug === activeTab);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#D9A441] uppercase">
              ĐƯỢC MUA NHIỀU NHẤT
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#26312D] sm:text-4xl">
              Hải Sản Tươi Sống Hôm Nay
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#E4E0D8] bg-[#FBF8F3] p-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#0E3D34] text-white'
                  : 'text-[#5B6B63] hover:text-[#26312D]'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('tom-cua');
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === 'tom-cua'
                  ? 'bg-[#0E3D34] text-white'
                  : 'text-[#5B6B63] hover:text-[#26312D]'
              }`}
            >
              Tôm &amp; Cua
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('muc-bach-tuoc');
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === 'muc-bach-tuoc'
                  ? 'bg-[#0E3D34] text-white'
                  : 'text-[#5B6B63] hover:text-[#26312D]'
              }`}
            >
              Mực &amp; Bạch tuộc
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('sot-tiec');
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === 'sot-tiec'
                  ? 'bg-[#0E3D34] text-white'
                  : 'text-[#5B6B63] hover:text-[#26312D]'
              }`}
            >
              Sốt Tiệc
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-8 py-3.5 text-xs font-bold text-[#26312D] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#E4EEEA] hover:text-[#0E3D34]"
          >
            <span>Xem Tất Cả 120+ Sản Phẩm</span>
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
