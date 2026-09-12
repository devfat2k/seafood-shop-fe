'use client';

import { Icon } from '@/components/common/Icon';
import { mapProductToCardItem } from '@/components/products/catalog-utils';
import { ProductCard } from '@/components/products/ProductCard';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';

type RelatedProductsSectionProps = {
  products: Product[];
  onAddToCart: (rel: Product, image: string) => void;
};

export const RelatedProductsSection = ({ products, onAddToCart }: RelatedProductsSectionProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 pt-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-secondary uppercase">
            <Icon name="sparkles" size="xs" />
            <span>Đánh bắt trong ngày</span>
          </div>
          <h2 className="mt-1 font-heading text-xl font-black text-foreground sm:text-2xl lg:text-3xl">
            Hải sản cùng bến cảng Phan Thiết hôm nay
          </h2>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-bold text-secondary transition-colors hover:text-primary sm:text-sm"
        >
          <span>Xem tất cả hải sản tươi sống</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {products.map((rel) => {
          const cardItem = mapProductToCardItem(rel);
          return (
            <ProductCard
              key={rel.id}
              product={cardItem}
              viewMode="grid"
              onAddToCart={() => {
                onAddToCart(rel, cardItem.image ?? '');
              }}
            />
          );
        })}
      </div>
    </section>
  );
};
