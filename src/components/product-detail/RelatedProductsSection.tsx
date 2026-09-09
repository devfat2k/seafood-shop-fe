'use client';

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
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Có thể bạn cũng thích
        </h2>
        <Link
          href="/products"
          className="text-xs font-bold text-secondary hover:text-primary sm:text-sm"
        >
          Xem tất cả hải sản tươi sống →
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
