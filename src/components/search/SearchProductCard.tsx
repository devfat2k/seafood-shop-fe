'use client';

import { mapProductToCardItem } from '@/components/products/catalog-utils';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/api';

type SearchProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const SearchProductCard = ({ product, onAddToCart }: SearchProductCardProps) => {
  const cardItem = mapProductToCardItem(product);

  return (
    <ProductCard
      product={cardItem}
      viewMode="grid"
      onAddToCart={() => {
        onAddToCart(product);
      }}
    />
  );
};
