'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';
import { ProductDescriptionTab } from './tabs/ProductDescriptionTab';
import { ProductReviewsTab } from './tabs/ProductReviewsTab';
import { ProductSpecsTab } from './tabs/ProductSpecsTab';

type ProductTabsProps = {
  product: Product;
};

type TabKey = 'description' | 'specs' | 'reviews';

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const reviewCount = product.reviewCount ?? 48;
  const rating = product.rating ?? 4.9;

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'description', label: 'Câu chuyện & Món ngon', icon: 'sparkles' },
    { key: 'specs', label: 'Thông số & Bảo quản', icon: 'sliders-horizontal' },
    { key: 'reviews', label: `Đánh giá thực tế (${reviewCount})`, icon: 'star' },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      <div className="flex border-b border-border bg-muted/20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
              }}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold transition-all sm:px-6 sm:py-4 sm:text-sm ${
                isActive
                  ? 'border-b-2 border-primary bg-card text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon
                name={tab.icon}
                size="xs"
                className={
                  isActive && tab.key === 'reviews' ? 'fill-accent text-accent' : undefined
                }
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8">
        {activeTab === 'description' && <ProductDescriptionTab product={product} />}
        {activeTab === 'specs' && <ProductSpecsTab product={product} />}
        {activeTab === 'reviews' && <ProductReviewsTab rating={rating} reviewCount={reviewCount} />}
      </div>
    </div>
  );
};
