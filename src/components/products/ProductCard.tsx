'use client';

import { ProductCardGrid } from './ProductCardGrid';
import { ProductCardList } from './ProductCardList';
import type { ProductCardItem, ProductCardProps } from './productCardTypes';

export type { ProductCardItem, ProductCardProps } from './productCardTypes';
export { getBadgeStyle } from './productCardTypes';

export function ProductCard<T extends ProductCardItem>(props: ProductCardProps<T>) {
  if (props.viewMode === 'list') {
    return <ProductCardList {...props} />;
  }
  return <ProductCardGrid {...props} />;
}
