'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { isProductInStock } from '@/components/products/catalog-utils';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import type { FeaturedProductTab } from '@/types/home';
import { formatCurrency } from '@/utils/Helpers';
import { matchesTab } from './featured/featured-utils';
import { FeaturedProductCard } from './featured/FeaturedProductCard';
import { FeaturedProductTabs } from './featured/FeaturedProductTabs';

type FeaturedProductsProps = {
  products?: Product[];
  tabs?: FeaturedProductTab[];
  onQuickView?: (product: ProductCardItem) => void;
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
};

export const FeaturedProducts = ({
  products = [],
  tabs = [],
  onQuickView,
  onAddToCart,
}: FeaturedProductsProps) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const displayTabs: FeaturedProductTab[] = [
    { slug: 'all', label: 'Tất cả sản phẩm' },
    ...tabs.filter((tab) => tab.slug !== 'all'),
  ].filter((tab, index, self) => index === self.findIndex((t) => t.slug === tab.slug));

  const filteredProducts = products.filter((p) => matchesTab(p, activeTab));

  if (products.length === 0) {
    return null;
  }

  const handleAddToCartClick = (item: Product) => {
    if (!isProductInStock(item)) {
      toast.error('Sản phẩm tạm thời hết hàng tại bến.');
      return;
    }

    const image = item.imageUrl ?? item.images?.[0] ?? '';

    if (onAddToCart) {
      onAddToCart({
        id: String(item.id),
        name: item.name,
        price: item.price,
        image,
      });
    }

    toast.success(`Đã thêm "${item.name}" vào giỏ hàng!`, {
      description: `Giá: ${formatCurrency(item.price)}`,
    });
  };

  return (
    <section id="featured-section" className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Hải Sản Nổi Bật
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Được khách hàng đặt mua nhiều nhất trong tuần qua tại bến Phan Thiết
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-secondary transition-colors hover:text-primary"
          >
            <span>Xem tất cả danh mục</span>
            <Icon name="arrow-right" size="xs" />
          </Link>
        </div>

        <FeaturedProductTabs
          tabs={displayTabs}
          activeTab={activeTab}
          onSelectTab={(slug) => {
            setActiveTab(slug);
          }}
        />

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-12 text-center">
            <Icon name="fish" size="xl" className="text-muted-foreground" />
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              Đang cập nhật thêm hải sản cho nhóm này.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
              }}
              className="mt-3 text-xs font-bold text-primary hover:underline"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <FeaturedProductCard
                key={item.id}
                item={item}
                onQuickView={onQuickView}
                onAddToCart={handleAddToCartClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
