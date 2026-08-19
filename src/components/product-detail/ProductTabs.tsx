'use client';

import { useState } from 'react';
import type { Product } from '@/types/api';
import { ProductDescriptionTab } from './tabs/ProductDescriptionTab';
import { ProductReviewsTab } from './tabs/ProductReviewsTab';
import { ProductSpecsTab } from './tabs/ProductSpecsTab';

type ProductTabsProps = {
  product: Product;
};

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const reviewCount = product.reviewCount ?? 48;
  const rating = product.rating ?? 4.9;

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      <div className="flex scrollbar-none overflow-x-auto border-b border-border bg-background">
        <button
          type="button"
          onClick={() => {
            setActiveTab('description');
          }}
          className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all sm:px-8 sm:text-sm ${
            activeTab === 'description'
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Mô tả sản phẩm
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('specs');
          }}
          className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all sm:px-8 sm:text-sm ${
            activeTab === 'specs'
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Thông số kỹ thuật
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('reviews');
          }}
          className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all sm:px-8 sm:text-sm ${
            activeTab === 'reviews'
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Đánh giá thực tế ({reviewCount})
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {activeTab === 'description' && <ProductDescriptionTab product={product} />}
        {activeTab === 'specs' && <ProductSpecsTab product={product} />}
        {activeTab === 'reviews' && <ProductReviewsTab rating={rating} reviewCount={reviewCount} />}
      </div>
    </div>
  );
};
