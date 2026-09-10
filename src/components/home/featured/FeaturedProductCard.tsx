'use client';

import { mapProductToCardItem } from '@/components/products/catalog-utils';
import { ProductCard } from '@/components/products/ProductCard';
import type { ProductCardItem } from '@/components/products/productCardTypes';
import type { Product } from '@/types/api';

type FeaturedProductCardProps = {
  item: Product;
  onQuickView?: (product: ProductCardItem) => void;
  onAddToCart: (item: Product) => void;
};

export const FeaturedProductCard = ({
  item,
  onQuickView,
  onAddToCart,
}: FeaturedProductCardProps) => {
  const cardItem = mapProductToCardItem(item);

  return (
    <ProductCard
      product={cardItem}
      viewMode="grid"
      onQuickView={onQuickView}
      onAddToCart={() => {
        onAddToCart(item);
      }}
    />
  );
};
